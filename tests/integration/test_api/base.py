# -*- encoding: utf-8 -*-
import os
from flask import url_for, current_app
import requests
from tests.helpers.testcases import LiveServerTestCase
from tests.helpers import model_factories
from kidstat.app import create_app, setup_api, setup_security

TIMESTAMP_FORMAT = '%Y-%m-%dT%H:%M:%S.%f+00:00'


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


class AuthorizedAPIIntegrationTestCase(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.user = model_factories.UserFactory(kids=[])
        self.user.set_password(self.user.email)
        self.user.save()
        self.access_token = self.login(self.user.email, self.user.email)
        self.headers = {'Authorization': 'JWT ' + self.access_token}