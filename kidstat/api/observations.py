# -*- encoding: utf-8 -*-
from flask import jsonify, current_app
from flask_jwt import jwt_required, current_identity
from flask_restful import Resource, abort
from flask_security.registerable import register_user
from marshmallow import fields, validate, Schema
from webargs.flaskparser import parser, use_args
from kidstat import models
from .base import MarshMallowResource


class ObservationSchema(Schema):

    timestamp = fields.DateTime(required=True, format='iso8601')
    parameter = fields.String(required=True)
    value = fields.Float(required=True)


class ObservationsListResource(MarshMallowResource):
    schema = ObservationSchema()

    @jwt_required()
    def get(self, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        if kid:
            return self.list_response(kid.observations)
        abort(404, errors={"error": "Kid with id {0} not found".format(kid_id)})

    @jwt_required()
    @use_args(ObservationSchema(strict=True))
    def post(self, args, kid_id):
        parameter = models.Parameter.objects\
            .filter(name=args['parameter']).first()
        if parameter is None:
            error_msg = "Bad parameter name {0}".format(args['parameter'])
            return jsonify({"error": error_msg}), 422
        kid = current_identity.get_kid_by_id(kid_id)
        observation = models.Observation(
            timestamp=args['timestamp'],
            parameter=parameter,
            value=args['value'])
        kid.observations.append(observation)
        current_identity.save()
        return self.object_response(observation)


class ObservationResource(MarshMallowResource):
    schema = ObservationSchema()

    @staticmethod
    def get_observation_or_404(kid_id, observation_id):
        kid = current_identity.get_kid_by_id(kid_id)
        if kid:
            observation = kid.get_observation_by_id(observation_id)
            if observation:
                return observation
        error_msg = "Observation id={0} not found".format(observation_id)
        abort(404, errors={"error": error_msg})

    @jwt_required()
    def get(self, kid_id, observation_id):
        return self.object_response(
            self.get_observation_or_404(kid_id, observation_id))

    @jwt_required()
    @use_args(ObservationSchema(strict=True))
    def put(self, args, kid_id, observation_id):
        observation = self.get_observation_or_404(kid_id, observation_id)
        parameter = models.Parameter.objects\
            .filter(name=args['parameter']).first()
        if parameter is None:
            error_msg = "Cannot find parameter {0}".format(args['parameter'])
            abort(422, errors={"error": error_msg})
        observation.timestamp = args['timestamp']
        observation.value = args['value']
        observation.parameter = parameter
        current_identity.save()
        return self.object_response(observation)

    @jwt_required()
    def delete(self, kid_id, observation_id):
        observation = self.get_observation_or_404(kid_id, observation_id)
        kid = current_identity.get_kid_by_id(kid_id)
        kid.update(pull__observations=observation)
        current_identity.save()
        return {'success': True}

