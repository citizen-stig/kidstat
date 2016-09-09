from datetime import timedelta

from kidstat.models import Categories

from tests import model_factories
from tests.testcases import BaseTestCase


class Sanity(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.parameter = model_factories.ParameterFactory()
        self.age = 3
        self.kid = model_factories.KidFactory()
        self.observation = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=self.kid.birthday + timedelta(days=self.age))
        self.kid.observations.append(self.observation)
        self.user = model_factories.UserFactory(kids=[self.kid])
        self.user.save()
        self.user.reload()

    def test_str(self):
        expected_str = '{0}: {1}'.format(self.observation.timestamp.date(),
                                         self.observation.value)
        self.assertEqual(str(self.observation), expected_str)

    def test_get_avg_category(self):
        model_factories.StandardFactory(
            parameter=self.parameter,
            age=self.age,
            gender=self.kid.gender,
            percentile=20,
            value=self.observation.value - 1)
        model_factories.StandardFactory(
            parameter=self.parameter,
            age=self.age,
            gender=self.kid.gender,
            percentile=50,
            value=self.observation.value)
        model_factories.StandardFactory(
            parameter=self.parameter,
            age=self.age,
            gender=self.kid.gender,
            percentile=90,
            value=self.observation.value + 5)

        category = self.observation.get_category()
        self.assertEqual(category, Categories.average)
