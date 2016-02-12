# -*- encoding: utf-8 -*-
from bson import ObjectId
from flask_mongoengine import MongoEngine
from flask_security import UserMixin, RoleMixin, utils, MongoEngineUserDatastore

db = MongoEngine()

MALE = 'male'
FEMALE = 'female'
ADMIN_ROLE = 'admin'


class Parameter(db.Document):
    name = db.StringField(required=True, unique=True)
    description = db.StringField(max_length=255)
    unit = db.StringField(max_length=10)

    def __str__(self):
        return '{0}, {1}'.format(self.name, self.unit)


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


class Observation(db.EmbeddedDocument):
    # TODO: observation duplicate checking
    id = db.ObjectIdField(primary_key=True, default=ObjectId)
    timestamp = db.DateTimeField(required=True)
    parameter = db.ReferenceField(Parameter, required=True)
    value = db.FloatField(required=True)

    def __str__(self):
        return '{0}: {1}'.format(self.timestamp, self.value)

    def get_standards(self, kid):
        age = (self.timestamp - kid.birthday).days
        return Standard.objects.filter(parameter=self.parameter,
                                       gender=kid.gender,
                                       age=age)


class Kid(db.EmbeddedDocument):
    id = db.ObjectIdField(primary_key=True, default=ObjectId)
    name = db.StringField(required=True)
    birthday = db.DateTimeField(required=True)
    gender = db.StringField(choices=[(x, x) for x in (MALE, FEMALE)])
    observations = db.EmbeddedDocumentListField(Observation)

    def __str__(self):
        return self.name

    def get_observation_by_id(self, observation_id):
        return self.observations.filter(id=observation_id).first()


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
        return utils.verify_password(password, self.password)

    def get_kid_by_id(self, kid_id):
        # We suppose that there's always one result
        # because of kid_id unique constraint
        return self.kids.filter(id=kid_id).first()


user_datastore = MongoEngineUserDatastore(db, User, Role)
