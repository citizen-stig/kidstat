# -*- encoding: utf-8 -*-
from flask import url_for, current_app
import requests
from .base import BaseAPIIntegrationTestCase
from tests.helpers import model_factories


class Login(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.url = self.get_server_url() + current_app.config.get('JWT_AUTH_URL_RULE')

    def test_login_correct(self):
        user = model_factories.UserFactory()
        user.set_password(user.email)
        user.save()
        data = {'email': user.email, 'password': user.email}

        response = requests.post(self.url, json=data)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertIn('access_token', response_data)
        self.assertIsNotNone(response_data['access_token'])

    def test_wrong_password(self):
        user = model_factories.UserFactory()
        user.set_password(user.email)
        user.save()
        data = {'email': user.email, 'password': 'wrong_password'}

        response = requests.post(self.url, json=data)

        self.assertEqual(response.status_code, 401)
        response_data = response.json()
        self.assertIn('description', response_data)
        self.assertIn('error', response_data)
        self.assertEqual(response_data['description'], 'Invalid credentials')
        self.assertEqual(response_data['error'], 'Bad Request')

    def test_non_existed_user(self):
        data = {'email': 'some_email123@example.com', 'password': 'some_user'}

        response = requests.post(self.url, json=data)

        self.assertEqual(response.status_code, 401)
        response_data = response.json()
        self.assertIn('description', response_data)
        self.assertIn('error', response_data)
        self.assertEqual(response_data['description'], 'Invalid credentials')
        self.assertEqual(response_data['error'], 'Bad Request')
