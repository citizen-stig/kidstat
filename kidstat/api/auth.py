# -*- encoding: utf-8 -*-
from flask import current_app
from flask_restful import Resource, abort
from flask_jwt import jwt_required
from flask_security.registerable import register_user
import facebook
from marshmallow import fields, Schema
from webargs.flaskparser import use_args
from kidstat import models
import mongoengine.errors


class CheckTokenResource(Resource):

    @jwt_required()
    def get(self):
        return {"success": True}


class RegistrationSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class RegistrationResource(Resource):

    @use_args(RegistrationSchema(strict=True))
    def post(self, args):
        try:
            register_user(**args)
            return {'success': True}
        except (mongoengine.errors.OperationError,
                mongoengine.errors.ValidationError) as exc:
            return abort(422, errors=str(exc))


class FacebookAuthSchema(Schema):
    access_token = fields.String(load_from='accessToken',
                                 dump_to='access_token',
                                 required=True)


class FacebookAuth(Resource):

    @use_args(FacebookAuthSchema(strict=True))
    def post(self, args):
        facebook_token = args['access_token']
        try:
            graph = facebook.GraphAPI(facebook_token)
            profile = graph.get_object("me", fields='id,name,email')
            email = profile.get('email')

            user = models.User.objects(email=email).first()
            if user is None:
                user = self.create_new(profile)
            return self.login_existed(user)
        except facebook.GraphAPIError:
            pass
        return {'success': False}

    @staticmethod
    def login_existed(user):
        jwt = current_app.extensions['jwt']
        kidstat_token = jwt.jwt_encode_callback(user)
        return {'access_token': kidstat_token.decode('utf-8')}

    @staticmethod
    def create_new(profile):
        name_parts = profile.get('name').split(' ')
        if len(name_parts) == 2:
            first_name = name_parts[0]
            last_name = name_parts[1]
        elif len(name_parts) >= 2:
            first_name = name_parts[0]
            last_name = ' '.join(name_parts[1:])
        else:
            first_name = ''
            last_name = profile.get('name')
        email = profile.get('email')
        new_user = models.User(
            email=email,
            first_name=first_name,
            last_name=last_name)
        new_user.save()
        return new_user
