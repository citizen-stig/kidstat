from datetime import timedelta

from tests import model_factories
from tests.testcases import BaseTestCase


class Sanity(BaseTestCase):
    def test_standard_str(self):
        kid = model_factories.KidFactory.build()
        self.assertEqual(str(kid), kid.name)


class KidObservations(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.parameter = model_factories.ParameterFactory()
        kid = model_factories.KidFactory(observations=[])
        self.user = model_factories.UserFactory(kids=[kid])
        self.user.save()
        self.user.reload()

    def test_add_observations(self):
        kid = self.user.kids[0]
        observation = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=1))
        kid.observations.append(observation)
        self.user.save()
        self.user.reload()

        kid = self.user.kids[0]
        self.assertEqual(len(kid.observations), 1)

        actual_observation = kid.observations[0]
        self.assertEqual(actual_observation.timestamp, observation.timestamp)
        self.assertEqual(actual_observation.value, observation.value)

    def test_get_observation_by_id(self):
        kid = self.user.kids[0]
        observation = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=1))
        kid.observations.append(observation)
        self.user.save()
        self.user.reload()
        observation.reload()
        self.assertIsNotNone(observation.id)

        actual_observation = kid.get_observation_by_id(observation.id)
        self.assertIsNotNone(actual_observation)
        self.assertEqual(actual_observation.id, observation.id)

    def test_observations_sorted(self):
        kid = self.user.kids[0]
        observation1 = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=1))
        observation2 = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=5))

        kid.observations.append(observation1)
        kid.observations.append(observation2)
        self.assertEqual(kid.observations[0].timestamp,
                         observation1.timestamp)
        self.assertEqual(kid.observations[1].timestamp,
                         observation2.timestamp)
        self.user.save()
        self.user.reload()
        kid = self.user.kids[0]
        self.assertEqual(len(kid.observations), 2)
        self.assertEqual(kid.observations[0].timestamp,
                         observation2.timestamp)
        self.assertEqual(kid.observations[1].timestamp,
                         observation1.timestamp)

    def test_only_one_observation_per_date(self):
        kid = self.user.kids[0]
        observation1 = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=2))
        observation2 = model_factories.ObservationFactory(
            parameter=self.parameter,
            timestamp=kid.birthday + timedelta(days=2))

        kid.add_observation(observation1)
        with self.assertRaises(ValueError) as cm:
            kid.add_observation(observation2)

        exc = cm.exception
        self.assertEqual(str(exc),
                         'Cannot add 2 observations for the same date')
