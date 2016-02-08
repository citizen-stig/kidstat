# -*- encoding: utf-8 -*-
from flask import url_for
import requests
from .base import BaseAPIIntegrationTestCase
from tests.helpers import model_factories


class SimpleCRUD(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.count = 3
        self.user = model_factories.UserFactory(
            kids=[model_factories.KidFactory(
                observations=[model_factories.ObservationFactory() for _ in range(self.count)])])
        self.user.set_password(self.user.email)
        self.user.save()
        self.kid = self.user.kids[0]
        self.url = self.get_server_url() + url_for('observations_list',
                                                   kid_id=str(self.kid.id))

    def test_non_auth(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 401)

        response = requests.get(self.url, headers={'Authorization': 'JWT 123'})
        self.assertEqual(response.status_code, 401)

    def test_get(self):
        access_token = self.login(self.user.email, self.user.email)

        response = requests.get(self.url, headers={'Authorization': 'JWT ' + access_token})
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        print(response_data)
        self.assertEqual(len(response_data), self.count)
