# -*- encoding: utf-8 -*-
from datetime import timedelta
from tests.helpers.testcases import BaseTestCase
from tests.helpers import model_factories


class Sanity(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.parameter = model_factories.ParameterFactory()
        self.age = 3
        self.kid = model_factories.KidFactory(observations=[])
        self.observation = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=self.kid.birthday + timedelta(days=self.age))
        self.kid.observations.append(self.observation)
        self.user = model_factories.UserFactory(kids=[self.kid])
        self.user.save()
        self.user.reload()

    def test_str(self):
        expected_str = '{0}: {1}'.format(self.observation.timestamp,
                                         self.observation.value)
        self.assertEqual(str(self.observation), expected_str)

    def test_get_standards(self):
        count = 5
        # Expected
        model_factories.StandardFactory.create_batch(count, parameter=self.parameter,
                                                     age=self.age,
                                                     gender=self.kid.gender)
        # Not Expected
        model_factories.StandardFactory.create_batch(count,
                                                     age=self.age,
                                                     gender=self.kid.gender)

        standards = self.observation.get_standards(self.kid)
        self.assertEqual(standards.count(), count)
