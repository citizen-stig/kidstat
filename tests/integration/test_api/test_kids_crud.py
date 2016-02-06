# -*- encoding: utf-8 -*-
from datetime import datetime, timedelta
import pytz
from flask import url_for
import requests
from .base import BaseAPIIntegrationTestCase
from tests.helpers import model_factories
from kidstat import models


class SimpleCRUD(BaseAPIIntegrationTestCase):

    def setUp(self):
        super().setUp()
        self.url = self.get_server_url() + url_for('kidslist')

    def test_non_auth(self):
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 401)

    def test_get_list(self):
        user = model_factories.UserFactory()
        user.set_password(user.email)
        user.save()

        access_token = self.login(user.email, user.email)

        response = requests.get(self.url, headers={'Authorization': 'JWT ' + access_token})
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(len(user.kids), len(response_data))

    def test_add_new(self):
        user = model_factories.UserFactory(kids=[])
        user.set_password(user.email)
        user.save()

        access_token = self.login(user.email, user.email)

        birthday = datetime(2016, 1, 2, 15, 30).replace(tzinfo=pytz.UTC)
        name = 'John'
        new_kid_data = {'name': name,
                        'gender': models.MALE,
                        'birthday': birthday.strftime('%Y-%m-%dT%H:%M:%SZ')}

        response = requests.post(self.url, json=new_kid_data,
                                 headers={'Authorization': 'JWT ' + access_token})
        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertEqual(response_data['name'], name)
        self.assertEqual(response_data['gender'], models.MALE)
        # TODO: Fix this
        # self.assertEqual(response_data['birthday'],
        #                  birthday.strftime('%Y-%m-%dT%H:%M:%S+00:00'))

        user = models.User.objects.get(id=user.id)
        self.assertEqual(len(user.kids), 1)

        new_kid = user.kids[0]

        self.assertEqual(new_kid.name, name)
        self.assertEqual(new_kid.gender, models.MALE)
        self.assertEqual(new_kid.birthday, birthday)

    def test_get_one(self):
        user = model_factories.UserFactory(kids=[model_factories.KidFactory() for _ in range(3)])
        user.set_password(user.email)
        user.save()
        user = models.User.objects.get(id=user.id)
        kid = user.kids[1]
        url = self.url + '/' + str(kid.id)

        access_token = self.login(user.email, user.email)

        response = requests.get(url, headers={'Authorization': 'JWT ' + access_token})

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        for field in ('name', 'birthday', 'gender'):
            self.assertIn(field, response_data)

        self.assertEqual(response_data['name'], kid.name)
        self.assertEqual(response_data['gender'], kid.gender)
        self.assertEqual(response_data['birthday'],
                         kid.birthday.strftime('%Y-%m-%dT%H:%M:%S.%f+00:00'))


    def test_update(self):
        user = model_factories.UserFactory(kids=[model_factories.KidFactory() for _ in range(3)])
        user.set_password(user.email)
        user.save()
        user = models.User.objects.get(id=user.id)
        kid = user.kids[1]
        url = self.url + '/' + str(kid.id)

        access_token = self.login(user.email, user.email)

        new_name = kid.name + 'SOMENEWDATA'
        birthday = kid.birthday - timedelta(days=3)
        gender = models.MALE if kid.gender == models.FEMALE else models.FEMALE
        new_kid_data = {'name': new_name,
                        'gender': gender,
                        'birthday': birthday.strftime('%Y-%m-%dT%H:%M:%SZ')}
        response = requests.put(url, json=new_kid_data,
                                headers={'Authorization': 'JWT ' + access_token})

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        for field in ('name', 'birthday', 'gender'):
            self.assertIn(field, response_data)

        self.assertEqual(response_data['name'], new_name)
        self.assertEqual(response_data['gender'], gender)
        # TODO: clear birthday output
        # self.assertEqual(response_data['birthday'],
        #                  birthday.strftime('%Y-%m-%dT%H:%M:%S.%f+00:00'))

    def test_delete(self):
        count = 3
        user = model_factories.UserFactory(kids=[model_factories.KidFactory() for _ in range(count)])
        user.set_password(user.email)
        user.save()
        user = models.User.objects.get(id=user.id)
        removed_kid = user.kids[1]
        url = self.url + '/' + str(removed_kid.id)

        access_token = self.login(user.email, user.email)

        response = requests.delete(url, headers={'Authorization': 'JWT ' + access_token})

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('success', response_data)
        self.assertTrue(response_data['success'])

        user = models.User.objects.get(id=user.id)
        self.assertEqual(len(user.kids), count - 1)

        for existed_kid in user.kids:
            self.assertNotEqual(removed_kid.id, existed_kid.id)
