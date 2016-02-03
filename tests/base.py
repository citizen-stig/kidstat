# -*- encoding: utf-8 -*-
import unittest
import os
import multiprocessing
import time
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
        db.connection.drop_database(self.app.config['MONGODB_DB'])


class LiveServerTestCase(BaseTestCase):
    DEFAULT_LIVESERVER_PORT = 5005
    DEFAULT_LIVESERVER_SLEEP_TIMEOUT = 1

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.process = cls._spawn_live_server(cls.app)

    @classmethod
    def tearDownClass(cls):
        cls._terminate_live_server(cls.process)
        super().tearDownClass()

    @classmethod
    def get_server_url(cls):
        return 'http://localhost:%s' % cls.app.config.get('LIVESERVER_PORT',
                                                          cls.DEFAULT_LIVESERVER_PORT)

    @staticmethod
    def _spawn_live_server(app):

        def worker(l_app):
            l_app.run(debug=l_app.config.get('DEBUG'),
                      port=l_app.config.get('LIVESERVER_PORT',
                                            LiveServerTestCase.DEFAULT_LIVESERVER_PORT))

        process = multiprocessing.Process(target=worker, args=(app,))

        process.start()
        time.sleep(LiveServerTestCase.DEFAULT_LIVESERVER_PORT)
        return process

    @staticmethod
    def _terminate_live_server(process):
        if process:
            process.terminate()

