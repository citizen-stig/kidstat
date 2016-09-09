import unittest


from kidstat.models import Categories


class PrettyTestCase(unittest.TestCase):

    def test_very_low(self):
        self.assertEqual(Categories.very_low.pretty, 'Very Low')

    def test_low(self):
        self.assertEqual(Categories.low.pretty, 'Low')

    def test_below_average(self):
        self.assertEqual(Categories.below_average.pretty, 'Below Average')

    def test_average(self):
        self.assertEqual(Categories.average.pretty, 'Average')

    def test_above_average(self):
        self.assertEqual(Categories.above_average.pretty, 'Above Average')

    def test_high(self):
        self.assertEqual(Categories.high.pretty, 'High')

    def test_very_high(self):
        self.assertEqual(Categories.very_high.pretty, 'Very High')


class GetForPercentileTestCase(unittest.TestCase):

    def check_for_values(self, values, expected):
        for value in values:
            actual_category = Categories.get_for_percentile(value)
            self.assertEqual(actual_category, expected)

    def test_very_low(self):
        self.check_for_values((0, 1, 5), Categories.very_low)

    def test_low(self):
        self.check_for_values((6, 10, 15), Categories.low)

    def test_below_average(self):
        self.check_for_values((16, 20, 25), Categories.below_average)

    def test_average(self):
        self.check_for_values((26, 30, 50, 75), Categories.average)

    def test_above_average(self):
        self.check_for_values((76, 80, 85), Categories.above_average)

    def test_high(self):
        self.check_for_values((86, 90, 95), Categories.high)

    def test_very_high(self):
        self.check_for_values((96, 98, 99, 100), Categories.very_high)

    def test_more_than_100(self):
        self.assertRaises(ValueError, Categories.get_for_percentile, 101,)