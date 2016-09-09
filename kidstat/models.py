from enum import IntEnum, unique
from bson import ObjectId
from flask_mongoengine import MongoEngine
from flask_security import UserMixin, RoleMixin, utils, MongoEngineUserDatastore

db = MongoEngine()

MALE = 'male'
FEMALE = 'female'
ADMIN_ROLE = 'admin'


@unique
class Categories(IntEnum):
    very_low = 5
    low = 15
    below_average = 25
    average = 75
    above_average = 85
    high = 95
    very_high = 100

    @property
    def pretty(self):
        return str(self.name).replace('_', ' ').title()

    @staticmethod
    def get_for_percentile(percentile):
        if percentile > 100:
            raise ValueError('Percentile should be less or equal 100')
        return next(x for x in sorted(Categories) if x >= percentile)


class Parameter(db.Document):
    name = db.StringField(required=True, unique=True)
    description = db.StringField(max_length=255)
    unit = db.StringField(max_length=10)

    def __str__(self):
        return self.name


class Standard(db.Document):
    id = db.ObjectIdField(primary_key=True, default=ObjectId)
    age = db.IntField(required=True)
    gender = db.StringField(required=True,
                            choices=[(x, x) for x in (MALE, FEMALE)])
    value = db.FloatField(required=True)
    percentile = db.IntField(required=True)
    parameter = db.ReferenceField(Parameter, required=True)

    def __str__(self):
        return '{0} {1} {2}'.format(self.gender, self.age, self.percentile)

    def get_category(self):
        return Categories.get_for_percentile(self.percentile)


class Observation(db.EmbeddedDocument):
    id = db.ObjectIdField(primary_key=True, default=ObjectId)
    timestamp = db.DateTimeField(required=True)
    parameter = db.ReferenceField(Parameter, required=True)
    value = db.FloatField(required=True)

    def __str__(self):
        return '{0}: {1}'.format(self.timestamp.date(), self.value)

    def get_standards(self):
        if self._instance is None:
            raise ValueError("Observation is not attached to kid")
        kid = self._instance
        age = kid.get_age(self.timestamp)
        standards = Standard.objects.filter(parameter=self.parameter,
                                            gender=kid.gender,
                                            age=age)
        return standards

    def get_category(self):
        standard = self.get_standards()\
            .filter(value__gte=self.value)\
            .order_by('percentile')\
            .first()
        return standard.get_category()


class Kid(db.EmbeddedDocument):
    id = db.ObjectIdField(primary_key=True, default=ObjectId)
    name = db.StringField(required=True)
    birthday = db.DateTimeField(required=True)
    gender = db.StringField(choices=[(x, x) for x in (MALE, FEMALE)])
    observations = db.SortedListField(db.EmbeddedDocumentField(Observation),
                                      ordering="timestamp", reverse=True)

    def __str__(self):
        return self.name

    def get_age(self, timestamp):
        return (timestamp - self.birthday).days

    def get_observation_by_id(self, observation_id):
        try:
            return next(x for x in self.observations
                        if str(x.id) == str(observation_id))
        except StopIteration:
            return None

    def add_observation(self, observation):
        dates = {x.timestamp.date() for x in self.observations}
        if observation.timestamp.date() in dates:
            raise ValueError('Cannot add 2 observations for the same date')
        self.observations.append(observation)


class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)

    def __str__(self):
        return self.name


class User(UserMixin, db.Document):
    email = db.StringField(required=True, unique=True)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)
    kids = db.EmbeddedDocumentListField(Kid)

    def __str__(self):
        return '{0} {1}'.format(self.first_name, self.last_name)

    def set_password(self, password):
        self.password = utils.encrypt_password(password)

    def check_password(self, password):
        if self.password:
            return utils.verify_password(password, self.password)
        return False

    def get_kid_by_id(self, kid_id):
        # We suppose that there's always one result
        # because of kid_id unique constraint
        return self.kids.filter(id=kid_id).first()

    def get_kid_by_name(self, kid_name):
        return self.kids.filter(name=kid_name).first()


user_datastore = MongoEngineUserDatastore(db, User, Role)
