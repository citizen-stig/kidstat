# -*- encoding: utf-8 -*-
from flask import url_for
import requests
from tests.integration.test_api.base import BaseAPIIntegrationTestCase
from tests import model_factories


class KidsCRUD(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.url = self.get_server_url() + url_for('api.kidresource')

    def test_non_auth(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_read(self):
        user = model_factories.UserFactory()

        session = self.login(user.email, user.email)

        response = session.get(self.url)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(len(user.kids), len(response_data))