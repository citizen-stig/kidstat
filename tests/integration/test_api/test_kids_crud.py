from datetime import datetime, timedelta

import pytz
import requests
from flask import url_for

from kidstat import models
from tests import model_factories
from .base import AuthorizedAPIIntegrationTestCase, SERVER_TIMESTAMP_FORMAT,\
    CLIENT_TIMESTAMP_FORMAT


class CRUD(AuthorizedAPIIntegrationTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.url = cls.get_server_url() + url_for('kids_list')

    def test_get_list(self):
        count = 3
        self.user.kids = model_factories.KidFactory.create_batch(count)
        self.user.save()

        response = requests.get(self.url, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('data', response_data)
        kids_list = response_data['data']
        self.assertEqual(len(self.user.kids), len(kids_list))
        for idx, kid in enumerate(kids_list):
            db_kid = self.user.kids[idx]
            self.assertEqual(len(kid), 4)
            self.assertEqual(str(kid['id']), str(db_kid.id))
            self.assertEqual(kid['name'], db_kid.name)
            self.assertEqual(kid['gender'], db_kid.gender)
            self.assertEqual(kid['birthday'],
                             db_kid.birthday.strftime(SERVER_TIMESTAMP_FORMAT))

    def test_add_new(self):
        birthday = datetime(2016, 1, 2).replace(tzinfo=pytz.UTC)
        name = 'John'
        new_kid_data = {'name': name,
                        'gender': models.MALE,
                        'birthday': birthday.strftime(CLIENT_TIMESTAMP_FORMAT)}

        response = requests.post(self.url, json=new_kid_data,
                                 headers=self.headers)

        self.assertEqual(response.status_code, 200)

        # Check db
        self.user.reload()
        self.assertEqual(self.user.kids.count(), 1)
        new_kid = self.user.kids[0]
        self.assertEqual(new_kid.name, name)
        self.assertEqual(new_kid.gender, models.MALE)
        self.assertEqual(new_kid.birthday, birthday)
        # Check response
        response_data = response.json()
        kid_data = response_data
        self.assertEqual(len(kid_data), 4)
        self.assertEqual(kid_data['id'], str(new_kid.id))
        self.assertEqual(kid_data['name'], name)
        self.assertEqual(kid_data['gender'], models.MALE)
        self.assertEqual(response_data['birthday'],
                         birthday.strftime(SERVER_TIMESTAMP_FORMAT))

    def test_add_second_same_name(self):
        birthday = datetime(2016, 1, 2).replace(tzinfo=pytz.UTC)
        name = 'John'
        new_kid_data = {'name': name,
                        'gender': models.MALE,
                        'birthday': birthday.strftime(CLIENT_TIMESTAMP_FORMAT)}

        response = requests.post(self.url, json=new_kid_data,
                                 headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response = requests.post(self.url, json=new_kid_data,
                                 headers=self.headers)
        self.assertEqual(response.status_code, 409)
        self.user.reload()
        self.assertEqual(self.user.kids.count(), 1)
        response_data = response.json()
        self.assertIn('error', response_data)
        self.assertEqual(response_data['error'],
                         'Kid with this name already exists')

    def test_get_one(self):
        self.user.kids = model_factories.KidFactory.create_batch(2)
        self.user.save()
        kid = self.user.kids[1]
        url = self.get_server_url() + url_for('kids_object', kid_id=str(kid.id))
        response = requests.get(url, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertEqual(len(response_data), 4)
        self.assertEqual(response_data['id'], str(kid.id))
        self.assertEqual(response_data['name'], kid.name)
        self.assertEqual(response_data['gender'], kid.gender)
        self.assertEqual(response_data['birthday'],
                         kid.birthday.strftime(SERVER_TIMESTAMP_FORMAT))

    def test_get_non_existed(self):
        url = self.get_server_url() + url_for('kids_object', kid_id='wombat')
        response = requests.get(url, headers=self.headers)
        self.assertAPI404(response)

    def test_update(self):
        self.user.kids = model_factories.KidFactory.build_batch(2)
        self.user.save()
        kid = self.user.kids[1]
        url = self.get_server_url() + url_for('kids_object', kid_id=str(kid.id))

        new_name = kid.name + 'SOME_NEW_DATA'
        birthday = kid.birthday - timedelta(days=3)
        gender = models.MALE if kid.gender == models.FEMALE else models.FEMALE
        new_kid_data = {'name': new_name,
                        'gender': gender,
                        'birthday': birthday.strftime(CLIENT_TIMESTAMP_FORMAT)}
        response = requests.put(url, json=new_kid_data, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        self.assertEqual(len(response_data), 4)
        self.assertEqual(response_data['id'], str(kid.id))
        self.assertEqual(response_data['name'], new_name)
        self.assertEqual(response_data['gender'], gender)
        self.assertEqual(response_data['birthday'],
                         birthday.strftime(SERVER_TIMESTAMP_FORMAT))

    def test_update_non_existed(self):
        url = self.get_server_url() + url_for('kids_object', kid_id='wombat')
        new_kid_data = {'name': 'some',
                        'gender': models.MALE,
                        'birthday': '2016-08-23'}
        response = requests.put(url, json=new_kid_data, headers=self.headers)
        self.assertAPI404(response)

    def test_delete(self):
        count = 3
        self.user.kids = model_factories.KidFactory.build_batch(count)
        self.user.save()
        removed_kid = self.user.kids[1]
        url = self.get_server_url() + url_for('kids_object',
                                              kid_id=str(removed_kid.id))

        response = requests.delete(url, headers=self.headers)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()
        self.assertIn('success', response_data)
        self.assertTrue(response_data['success'])

        self.user.reload()
        self.assertEqual(self.user.kids.count(), count - 1)
        for existed_kid in self.user.kids:
            self.assertNotEqual(removed_kid.id, existed_kid.id)

    def test_delete_non_existed(self):
        url = self.get_server_url() + url_for('kids_object', kid_id='wombat')
        response = requests.delete(url, headers=self.headers)
        self.assertAPI404(response)

    # Security
    def test_update_other_user_kid(self):
        other_user = model_factories.UserFactory(
            kids=model_factories.KidFactory.build_batch(2))
        other_kid = other_user.kids[0]
        url = self.get_server_url() + url_for('kids_object',
                                              kid_id=str(other_kid.id))
        new_kid_data = {'name': other_kid.name + "some new data",
                        'gender': other_kid.gender,
                        'birthday': other_kid.birthday.strftime(
                            CLIENT_TIMESTAMP_FORMAT)}
        response = requests.put(url, headers=self.headers, json=new_kid_data)
        self.assertAPI404(response)

    def test_delete_other_user_kid(self):
        other_user = model_factories.UserFactory(
            kids=model_factories.KidFactory.build_batch(2))
        other_kid = other_user.kids[0]
        url = self.get_server_url() + url_for('kids_object',
                                              kid_id=str(other_kid.id))
        response = requests.delete(url, headers=self.headers)
        self.assertAPI404(response)


