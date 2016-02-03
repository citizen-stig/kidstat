# -*- encoding: utf-8 -*-
from flask import url_for
import requests
from tests.base import LiveServerTestCase
from kidstat.app import create_app, setup_api, setup_security


class BaseAPIIntegrationTestCase(LiveServerTestCase):

    @classmethod
    def create_app(cls):
        app = create_app()
        setup_security(app)
        setup_api(app)
        return app

    def login(self, email, password):
        session = requests.Session()
        response = session.post(self.get_server_url() + url_for('security.login'),
                                allow_redirects=False,
                                data=dict(email=email, password=password))
        self.assertIn(response.status_code, [302, 200])
        return session
