# -*- encoding: utf-8 -*-
from bson import ObjectId
from flask_mongoengine import MongoEngine
from flask_security import UserMixin, RoleMixin, utils

db = MongoEngine()

MALE = 'male'
FEMALE = 'female'

ADMIN_ROLE = 'admin'


class Standard(db.EmbeddedDocument):
    id = db.ObjectIdField(primary_key=True, default=lambda: ObjectId())
    age = db.IntField(required=True)
    gender = db.StringField(required=True,
                            choices=[(x, x) for x in (MALE, FEMALE)])
    value = db.FloatField(required=True)
    percentile = db.IntField(required=True)

    def __str__(self):
        return '{0} {1} {2}'.format(self.gender, self.age, self.percentile)


class Parameter(db.Document):
    name = db.StringField(required=True)
    description = db.StringField(max_length=255)
    unit = db.StringField(max_length=10)
    standards = db.ListField(db.EmbeddedDocumentField(Standard))

    def __str__(self):
        return '{0}, {1}'.format(self.name, self.unit)


class Observations(db.EmbeddedDocument):
    # TODO: observation duplicate checking
    id = db.ObjectIdField(primary_key=True, default=lambda: ObjectId())
    timestamp = db.DateTimeField(required=True)
    parameter = db.ReferenceField(Parameter, required=True)
    value = db.FloatField(required=True)

    def __str__(self):
        return '{0}: {1}'.format(self.timestamp, self.value)


class Kid(db.EmbeddedDocument):
    id = db.ObjectIdField(primary_key=True, default=lambda: ObjectId())
    first_name = db.StringField(required=True)
    birthday = db.DateTimeField(required=True)
    gender = db.StringField(choices=[(x, x) for x in (MALE, FEMALE)])
    observations = db.ListField(db.EmbeddedDocumentField(Observations))

    def __str__(self):
        return self.first_name


class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)

    def __str__(self):
        return self.name


class User(UserMixin, db.Document):
    email = db.StringField(required=True)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)

    kids = db.ListField(db.EmbeddedDocumentField(Kid))

    def __str__(self):
        return '{0} {1}'.format(self.first_name, self.last_name)

    def set_password(self, password):
        self.password = utils.encrypt_password(password)
