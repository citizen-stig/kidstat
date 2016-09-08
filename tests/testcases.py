import unittest
import os
import threading
from wsgiref.simple_server import make_server
from wsgiref.simple_server import WSGIRequestHandler, WSGIServer, ServerHandler
from kidstat.models import db
from kidstat.app import create_app


class BaseTestCase(unittest.TestCase):

    @classmethod
    def create_app(cls):
        return create_app()

    @classmethod
    def setUpClass(cls):
        os.environ.setdefault('FLASK_SETTINGS', 'testing')
        cls.app = cls.create_app()
        cls._ctx = cls.app.test_request_context()
        cls._ctx.push()

    @classmethod
    def tearDownClass(cls):
        cls._ctx.pop()

    def setUp(self):
        self.client = self.app.test_client(use_cookies=True)
        db.connection.drop_database(self.app.config['MONGODB_SETTINGS']['db'])


def is_broken_pipe_error():
    exc_type, exc_value = sys.exc_info()[:2]
    return issubclass(exc_type, socket.error) and exc_value.args[0] == 32


class SilentServerHandler(ServerHandler):
    def handle_error(self):
        if not is_broken_pipe_error():
            super(ServerHandler, self).handle_error()


class SilentWSGIServer(WSGIServer):

    def handle_error(self, request, client_address):
        if not is_broken_pipe_error():
            super(WSGIServer, self).handle_error(request, client_address)


class SilentWSGIRequestHandler(WSGIRequestHandler):

    def log_message(self, log_format, *args):
        pass

    def handle(self):
        """Copy of """
        self.raw_requestline = self.rfile.readline(65537)
        if len(self.raw_requestline) > 65536:
            self.requestline = ''
            self.request_version = ''
            self.command = ''
            self.send_error(414)
            return

        if not self.parse_request():  # An error code has been sent, just exit
            return

        handler = SilentServerHandler(
            self.rfile, self.wfile, self.get_stderr(), self.get_environ()
        )
        handler.request_handler = self  # backpointer for logging
        handler.run(self.server.get_app())


class LiveServerThread(threading.Thread):

    def __init__(self, app):
        port = int(app.config.get('LIVESERVER_PORT', 5005))
        if app.config.get('DEBUG', False):
            self.httpd = SilentWSGIServer(('', port), WSGIRequestHandler)
        else:
            self.httpd = SilentWSGIServer(('', port), SilentWSGIRequestHandler)
        self.httpd.set_app(app)
        self.is_ready = threading.Event()
        super(LiveServerThread, self).__init__()

    def run(self):
        self.is_ready.set()
        self.httpd.serve_forever()

    def terminate(self):
        self.httpd.shutdown()
        self.httpd.server_close()


class LiveServerTestCase(BaseTestCase):
    DEFAULT_LIVESERVER_PORT = 5005
    DEFAULT_LIVESERVER_SLEEP_TIMEOUT = 1
    wsgi_thread = None
    app = None

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.wsgi_thread = LiveServerThread(cls.app)
        cls.wsgi_thread.daemon = True
        cls.wsgi_thread.start()
        cls.wsgi_thread.is_ready.wait()

    @classmethod
    def tearDownClass(cls):
        cls.wsgi_thread.terminate()
        super().tearDownClass()

    @classmethod
    def get_server_url(cls):
        return 'http://localhost:{0}'.format(
            cls.app.config.get('LIVESERVER_PORT', cls.DEFAULT_LIVESERVER_PORT))
