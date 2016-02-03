# -*- encoding: utf-8 -*-
from flask import Blueprint
from flask_restful import Resource, fields, marshal_with, abort
from flask_security import current_user

from kidstat import models


api_blueprint = Blueprint('api', __name__)


@api_blueprint.before_request
def authenticated():
    if not current_user.is_active() or not current_user.is_authenticated():
        abort(401)


class ParameterResource(Resource):

    standard_fields = {
        'age': fields.Integer,
        'gender': fields.String,
        'value': fields.Float,
        'percentile': fields.Integer
    }

    parameter_fields = {
        'id': fields.String,
        'name': fields.String,
        'description': fields.String,
        'unit': fields.String,
        'standards': fields.List(fields.Nested(standard_fields))
    }

    @marshal_with(parameter_fields)
    def get(self):
        return list(models.Parameter.objects.all())


class KidResource(Resource):

    kid_fields = {
        'first_name': fields.String,
        'gender': fields.String,
        'birthday': fields.DateTime(dt_format='rfc822'),
    }

    @marshal_with(kid_fields)
    def get(self):
        return list(current_user.kids)


class Observation(Resource):

    observation_fields = {
        'timestamp': fields.DateTime(dt_format='rfc822'),
        'parameter': fields.String,
        'value': fields.Float
    }
