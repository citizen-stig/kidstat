# -*- encoding: utf-8 -*-
from tests.helpers.testcases import BaseTestCase
from tests.helpers import model_factories


class Sanity(BaseTestCase):
    def test_standard_str(self):
        kid = model_factories.KidFactory.build()
        self.assertEqual(str(kid), kid.name)
