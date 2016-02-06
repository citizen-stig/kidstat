# -*- encoding: utf-8 -*-
import os
from flask import url_for, current_app
import requests
from tests.helpers.testcases import LiveServerTestCase
from kidstat.app import create_app, setup_api, setup_security


class BaseAPIIntegrationTestCase(LiveServerTestCase):

    @classmethod
    def create_app(cls):
        app = create_app()
        setup_security(app)
        setup_api(app)
        return app

    def login(self, email, password):
        login_url = self.get_server_url() + current_app.config.get('JWT_AUTH_URL_RULE')
        response = requests.post(login_url, json={'email': email, 'password': password})
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        return response_data['access_token']
