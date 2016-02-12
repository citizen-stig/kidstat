# -*- encoding: utf-8 -*-
import unittest
from datetime import datetime, timedelta
from flask import url_for
import requests
from .base import AuthorizedAPIIntegrationTestCase, TIMESTAMP_FORMAT
from tests.helpers import model_factories


class ListAPI(AuthorizedAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.user.kids = [model_factories.KidFactory(observations=[])]
        self.user.save()
        self.user.reload()
        kid = self.user.kids[0]
        self.url = self.get_server_url() + url_for('observations_list',
                                                   kid_id=str(kid.id))

    def test_get_list(self):
        count = 3
        self.user.kids[0].observations = [model_factories.ObservationFactory() for _ in range(count)]
        self.user.save()

        response = requests.get(self.url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('data', response_data)
        observations_data = response_data['data']
        self.assertEqual(len(observations_data), count)

    def test_for_non_existed_kid(self):
        url = self.get_server_url() + url_for('observations_list', kid_id='abcdee')

        response = requests.get(url, headers=self.headers)

        self.assertEqual(response.status_code, 404)

    def test_add_new(self):
        observations = self.user.kids[0].observations
        self.assertEqual(len(observations), 0)
        parameter = model_factories.ParameterFactory()
        kid = self.user.kids[0]
        timestamp = (kid.birthday + timedelta(days=3))
        value = 1.23
        data = {
            'timestamp': timestamp.strftime(TIMESTAMP_FORMAT),
            'parameter': parameter.name,
            'value': value
        }
        response = requests.post(self.url, json=data, headers=self.headers)

        self.assertEqual(response.status_code, 200)

        response_data = response.json()
        self.assertIn('data', response_data)
        observations_data = response_data['data']
        self.assertEqual(len(observations_data), 1)
        observation_data = observations_data[0]

        self.user.reload()
        observations = self.user.kids[0].observations
        self.assertEqual(len(observations), 1)
        observation = observations[0]
        # Compare with sent data
        self.assertEqual(observation.timestamp, timestamp)
        self.assertEqual(observation.parameter, parameter)
        self.assertEqual(observation.value, value)
        # Compare with response data
        self.assertEqual(observation.timestamp.strftime(TIMESTAMP_FORMAT),
                         observation_data['timestamp'])
        self.assertEqual(str(observation.parameter),
                         observation_data['parameter'])
        self.assertEqual(observation.value,
                         observation_data['value'])


class SingleObjectAPI(AuthorizedAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        observation = model_factories.ObservationFactory()
        kid = model_factories.KidFactory(observations=[observation])
        self.user.kids = [kid]
        self.user.save()
        self.user.reload()
        self.url = self.get_server_url() + url_for('observation_object',
                                                   kid_id=kid.id,
                                                   observation_id=observation.id)

    def test_get_one(self):
        response = requests.get(self.url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        # Check response
        for field_name in ('timestamp', 'value', 'parameter'):
            self.assertIn(field_name, response_data)
        observation = self.user.kids[0].observations[0]
        self.assertEqual(response_data['timestamp'],
                         observation.timestamp.strftime(TIMESTAMP_FORMAT))
        self.assertEqual(response_data['value'], observation.value)
        self.assertEqual(response_data['parameter'], str(observation.parameter))

    def test_update(self):
        observation = self.user.kids[0].observations[0]
        parameter = model_factories.ParameterFactory()
        timestamp = (observation.timestamp + timedelta(days=3))
        value = observation.value + 3.11
        data = {'timestamp': timestamp.strftime(TIMESTAMP_FORMAT),
                'parameter': parameter.name,
                'value': value}

        response = requests.put(self.url, json=data, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        # Verify response
        response_data = response.json()
        for field_name in ('timestamp', 'value', 'parameter'):
            self.assertIn(field_name, response_data)
        self.assertEqual(response_data['timestamp'],
                         timestamp.strftime(TIMESTAMP_FORMAT))
        self.assertEqual(response_data['value'], value)
        self.assertEqual(response_data['parameter'], str(parameter))

        # Verify db
        self.user.reload()
        observation = self.user.kids[0].observations[0]

        self.assertEqual(observation.timestamp, timestamp)
        self.assertEqual(observation.value, value)
        self.assertEqual(observation.parameter, parameter)

    @unittest.skip('Not implemented')
    def test_update_non_existed_observation(self):
        pass

    @unittest.skip('Not implemented')
    def test_update_non_existed_user(self):
        pass

    @unittest.skip('Not implemented')
    def test_update_to_non_existed_parameter(self):
        pass

    @unittest.skip('Not implemented')
    def test_delete(self):
        response = requests.delete(self.url, headers=self.headers)

        # Verify response
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('success', response_data)
        self.assertTrue(response_data['success'])
        # Verify DB
        self.user.reload()
        observations = self.user.kids[0].observations
        self.assertEqual(len(observations), 0)


