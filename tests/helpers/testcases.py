# -*- encoding: utf-8 -*-
import unittest
import os
import multiprocessing
import threading
import time
from wsgiref.simple_server import make_server
from flask import url_for
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


class LiveServerThread(threading.Thread):

    def __init__(self, app):
        port = int(app.config.get('LIVESERVER_PORT', 5005))
        self.httpd = make_server('', port, app)
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

    @classmethod
    def setUpClass(cls):
        super(LiveServerTestCase, cls).setUpClass()
        cls.wsgi_thread = LiveServerThread(cls.app)
        cls.wsgi_thread.daemon = True
        cls.wsgi_thread.start()
        cls.wsgi_thread.is_ready.wait()

    @classmethod
    def tearDownClass(cls):
        cls.wsgi_thread.terminate()
        super(LiveServerTestCase, cls).tearDownClass()

    @classmethod
    def get_server_url(cls):
        return 'http://localhost:{0}'.format(
            cls.app.config.get('LIVESERVER_PORT', cls.DEFAULT_LIVESERVER_PORT))


