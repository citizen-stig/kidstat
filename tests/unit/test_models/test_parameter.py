import unittest

from tests import model_factories
from tests.testcases import BaseTestCase


class Sanity(BaseTestCase):

    def test_standard_str(self):
        standard = model_factories.StandardFactory()
        expected_str = '{0} {1} {2}'.format(standard.gender,
                                            standard.age,
                                            standard.percentile)
        self.assertEqual(expected_str, str(standard))

    def test_parameter_str(self):
        parameter = model_factories.ParameterFactory()
        expected_str = '{0}'.format(parameter.name)
        self.assertEqual(str(parameter), expected_str)


class StandardValidation(BaseTestCase):

    @unittest.skip('Not Implemented')
    def test_age_lower_bound(self):
        pass

    @unittest.skip('Not Implemented')
    def test_age_upper_bound(self):
        pass

    @unittest.skip('Not Implemented')
    def test_value_lower_bound(self):
        pass

    @unittest.skip('Not Implemented')
    def test_percentile_lower_bound(self):
        pass

    @unittest.skip('Not Implemented')
    def test_percentile_upper_bound(self):
        pass
