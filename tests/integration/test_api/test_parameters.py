# -*- encoding: utf-8 -*-
from flask import url_for
import requests
from .base import BaseAPIIntegrationTestCase
from tests.helpers import model_factories


class Read(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.count = 3
        self.parameters = model_factories.ParameterFactory.create_batch(self.count)

    def test_read_list(self):
        url = self.get_server_url() + url_for('parameters_list')
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('data', response_data)
        parameters_data = response_data['data']
        self.assertEqual(len(parameters_data), self.count)

    def test_read_single(self):
        parameter = self.parameters[1]
        url = self.get_server_url() + url_for('parameter_object', parameter_name=parameter.name)

        response = requests.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        for field in ('name', 'unit', 'description'):
            self.assertIn(field, response_data)

        self.assertEqual(response_data['name'], parameter.name)
        self.assertEqual(response_data['unit'], parameter.unit)
        self.assertEqual(response_data['description'], parameter.description)

