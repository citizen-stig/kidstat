# -*- encoding: utf-8 -*-
from datetime import datetime
from flask_restful import Resource, fields, marshal_with, abort, reqparse
from flask_jwt import jwt_required, current_identity
# from webargs.flaskparser import use_args, parser

from kidstat import models


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


def birthday_validator(timestamp):
    try:
        return datetime.strptime(timestamp, '%Y-%m-%dT%H:%M:%SZ')
    except ValueError:
        pass


kid_parser = reqparse.RequestParser()
kid_parser.add_argument('name', required=True)
kid_parser.add_argument('gender', choices=[models.MALE, models.FEMALE])
kid_parser.add_argument('birthday', type=birthday_validator)

kid_fields = {
        'name': fields.String,
        'gender': fields.String,
        'birthday': fields.DateTime(dt_format='iso8601'),
    }


class KidsList(Resource):

    @marshal_with(kid_fields)
    @jwt_required()
    def get(self):
        return list(current_identity.kids)

    @marshal_with(kid_fields)
    @jwt_required()
    def post(self):
        args = kid_parser.parse_args()
        kid = models.Kid(
            name=args['name'],
            birthday=args['birthday'],
            gender=args['gender'])
        current_identity.kids.append(kid)
        current_identity.save()
        # FIXME: read data from DB
        return kid


class KidResource(Resource):

    @marshal_with(kid_fields)
    @jwt_required()
    def get(self, kid_id):
        return current_identity.get_kid_by_id(kid_id)

    @marshal_with(kid_fields)
    @jwt_required()
    def put(self, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        args = kid_parser.parse_args()
        kid.name = args['name']
        kid.gender = args['gender']
        kid.birthday = args['birthday']
        current_identity.save()
        return current_identity.get_kid_by_id(kid_id)

    @jwt_required()
    def delete(self, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        current_identity.update(pull__kids=kid)
        current_identity.save()
        return {'success': True}


class Observation(Resource):

    observation_fields = {
        'timestamp': fields.DateTime(dt_format='rfc822'),
        'parameter': fields.String,
        'value': fields.Float
    }


# def a(user_id, kid_id):
#     models.User.objects.filter(id=user_id)
#     models.User.objects.filter(id=user_id, kids__match={'id': kid_id}).only('kids')