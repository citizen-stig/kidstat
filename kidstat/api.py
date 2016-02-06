# -*- encoding: utf-8 -*-
from flask_restful import Resource, fields, marshal_with, abort, reqparse
from flask_jwt import jwt_required, current_identity
# from webargs.flaskparser import use_args, parser

from kidstat import models


login_parser = reqparse.RequestParser()
login_parser.add_argument('email')
login_parser.add_argument('password')


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
        'birthday': fields.DateTime(dt_format='iso8601'),
    }

    @marshal_with(kid_fields)
    @jwt_required()
    def get(self):
        return list(current_identity.kids)


class Observation(Resource):

    observation_fields = {
        'timestamp': fields.DateTime(dt_format='rfc822'),
        'parameter': fields.String,
        'value': fields.Float
    }
