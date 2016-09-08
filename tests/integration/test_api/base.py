import requests
from flask import current_app

from kidstat.app import create_app, setup_api, setup_security
from tests import model_factories
from tests.testcases import LiveServerTestCase

TIMESTAMP_FORMAT = '%Y-%m-%dT%H:%M:%S+00:00'
CLIENT_TIMESTAMP_FORMAT = '%Y-%m-%d'


class BaseAPIIntegrationTestCase(LiveServerTestCase):

    @classmethod
    def create_app(cls):
        app = create_app()
        setup_security(app)
        setup_api(app)
        return app

    def login(self, email, password):
        login_url = self.get_server_url() + current_app.config.get('JWT_AUTH_URL_RULE')
        response = requests.post(login_url,
                                 json={'email': email, 'password': password})
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        return response_data['access_token']

    def verify_response_error(self, response, field_name, message):
        response_data = response.json()
        self.assertIn('errors', response_data)
        error_data = response_data['errors']
        self.assertEqual(len(error_data), 1)
        self.assertIn(field_name, error_data)
        field_error = error_data[field_name]
        self.assertEqual(len(field_error), 1)
        self.assertEqual(field_error[0], message)


class AuthorizedAPIIntegrationTestCase(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.user = model_factories.UserFactory(kids=[])
        self.user.set_password(self.user.email)
        self.user.save()
        self.access_token = self.login(self.user.email, self.user.email)
        self.headers = {'Authorization': 'JWT ' + self.access_token}
