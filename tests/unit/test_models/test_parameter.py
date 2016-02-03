# -*- encoding: utf-8 -*-
import unittest
from tests.base import BaseTestCase
from tests import model_factories
from kidstat import models


class Sanity(BaseTestCase):

    def test_standard_str(self):
        standard = model_factories.StandardFactory()
        expected_str = '{0} {1} {2}'.format(standard.gender,
                                            standard.age,
                                            standard.percentile)
        self.assertEqual(expected_str, str(standard))

    def test_parameter_str(self):
        parameter = model_factories.ParameterFactory(standards=[])
        expected_str = '{0}, {1}'.format(parameter.name, parameter.unit)
        self.assertEqual(str(parameter), expected_str)

    def test_parameter_without_standards(self):
        parameter = model_factories.ParameterFactory(standards=[])
        parameter.save()
        self.assertIsNotNone(parameter)

    def test_parameter_with_several_standards(self):
        parameter = model_factories.ParameterFactory()
        parameter.save()
        self.assertIsNotNone(parameter.id)
        for standard in parameter.standards:
            self.assertIsNotNone(standard.id)

    @unittest.skip('Not Implemented')
    def test_duplicate_standard(self):
        pass

    @unittest.skip('Not Implemented')
    def test_same_standard_different_parameters(self):
        pass

    @unittest.skip('Not Implemented')
    def test_duplicate_parameters(self):
        pass


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
