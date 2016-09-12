from datetime import date, datetime, timedelta
import pytz
import factory
import factory.fuzzy
from factory.mongoengine import MongoEngineFactory
from kidstat import models


class FuzzyDateTimeInPast(factory.fuzzy.FuzzyDate):

    def __init__(self, start_days=30, end_days=0):
        today = date.today()
        super().__init__(start_date=today - timedelta(days=start_days),
                         end_date=today - timedelta(days=end_days))

    def fuzz(self):
        return datetime.combine(super().fuzz(), datetime.min.time())


class EmbeddedDocumentFactory(factory.Factory):
    class Meta:
        abstract = True

    @classmethod
    def _prepare(cls, create, **kwargs):
        return super()._prepare(False, **kwargs)


class ParameterFactory(MongoEngineFactory):
    class Meta:
        model = models.Parameter

    name = factory.Sequence(lambda n: 'parameter-%d' % n)
    description = factory.Sequence(lambda n: 'Description of parameter%d' % n)
    unit = factory.Iterator(['kg', 'm'])


class StandardFactory(MongoEngineFactory):
    class Meta:
        model = models.Standard

    age = factory.fuzzy.FuzzyInteger(low=1, high=300)
    gender = factory.Iterator([models.MALE, models.FEMALE])
    value = factory.fuzzy.FuzzyFloat(low=1.3, high=20.4)
    percentile = factory.fuzzy.FuzzyInteger(low=1, high=99)
    parameter = factory.SubFactory(ParameterFactory)


class ObservationFactory(EmbeddedDocumentFactory):
    class Meta:
        model = models.Observation

    timestamp = FuzzyDateTimeInPast(end_days=29)
    parameter = factory.SubFactory(ParameterFactory)
    value = factory.fuzzy.FuzzyFloat(low=1.3, high=20.4)


class KidFactory(EmbeddedDocumentFactory):
    class Meta:
        model = models.Kid

    name = factory.Sequence(lambda n: 'Kid%d' % n)
    birthday = FuzzyDateTimeInPast(start_days=60, end_days=31)
    gender = factory.Iterator([models.MALE, models.FEMALE])


class RoleFactory(MongoEngineFactory):
    class Meta:
        model = models.Role

    name = factory.Iterator(['admin', 'user'])
    description = factory.Sequence(lambda n: 'Description for Role%d' % n)


class BaseUserFactory(MongoEngineFactory):
    class Meta:
        model = models.User
    email = factory.Sequence(lambda n: 'user%d@example.com' % n)
    # Works only if password in plain text
    password = factory.LazyAttribute(lambda o: o.email)


class UserFactory(BaseUserFactory):
    first_name = factory.Sequence(lambda n: 'User%d' % n)
    last_name = factory.Sequence(lambda n: 'Last%d' % n)
    roles = factory.LazyAttribute(
        lambda o: [models.user_datastore.find_or_create_role('user')])
