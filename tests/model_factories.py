from datetime import datetime, timedelta
import pytz
import factory
import factory.fuzzy
from factory.mongoengine import MongoEngineFactory
from kidstat import models


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

    timestamp = factory.fuzzy.FuzzyDateTime(
        start_dt=datetime.utcnow().replace(tzinfo=pytz.UTC) - timedelta(
            days=29),
        end_dt=datetime.utcnow().replace(tzinfo=pytz.UTC),
        force_hour=0,
        force_minute=0,
        force_second=0,
        force_microsecond=0)
    parameter = factory.SubFactory(ParameterFactory)
    value = factory.fuzzy.FuzzyFloat(low=1.3, high=20.4)


class KidFactory(EmbeddedDocumentFactory):
    class Meta:
        model = models.Kid

    name = factory.Sequence(lambda n: 'Kid%d' % n)
    birthday = factory.fuzzy.FuzzyDateTime(
        start_dt=datetime.utcnow().replace(tzinfo=pytz.UTC) - timedelta(days=60),
        end_dt=datetime.utcnow().replace(tzinfo=pytz.UTC) - timedelta(days=31),
        force_hour=0,
        force_minute=0,
        force_second=0,
        force_microsecond=0)
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
