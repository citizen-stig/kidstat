from flask import jsonify, current_app
from flask_jwt import jwt_required, current_identity
from flask_restful import Resource, abort
from flask_security.registerable import register_user
from marshmallow import fields, validate, Schema
from webargs.flaskparser import parser, use_args
from kidstat import models
from .base import MarshMallowResource

class ParameterSchema(Schema):
    name = fields.String(attribute='name', dump_to='name', required=True)
    unit = fields.String(required=True)
    description = fields.String(required=True)


class ParametersListResource(MarshMallowResource):
    schema = ParameterSchema(many=True)

    def get(self):
        return self.list_response(models.Parameter.objects.all())


class ParameterResource(MarshMallowResource):
    schema = ParameterSchema()

    def get(self, parameter_name):
        return self.object_response(
            models.Parameter.objects.filter(name=parameter_name).first())
