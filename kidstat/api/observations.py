from flask_jwt import jwt_required, current_identity
from flask_restful import abort
from marshmallow import fields, Schema, ValidationError, post_load
import pytz
from webargs.flaskparser import use_args
from kidstat import models
from .base import MarshMallowResource


def validate_parameter(parameter_name):
    parameter = models.Parameter.objects \
        .filter(name=parameter_name).first()
    if parameter is None:
        raise ValidationError('No Such Parameter: {0}'.format(parameter_name))


def validate_value(value):
    if value < 0.0:
        raise ValidationError('Value cannot be less than 0')


class ObservationSchema(Schema):
    timestamp = fields.DateTime(required=True, format='iso8601')
    parameter = fields.String(required=True, validate=validate_parameter)
    value = fields.Float(required=True, validate=validate_value)

    @post_load
    def annotate_tz_info(self, data):
        timestamp = data['timestamp']
        if timestamp.tzinfo is None:
            data['timestamp'] = timestamp.replace(tzinfo=pytz.UTC)
        return data

    # TODO: Make object in schema, not in resource!!!!


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
        kid = current_identity.get_kid_by_id(kid_id)
        parameter = models.Parameter.objects \
            .filter(name=args['parameter']).first()
        observation = models.Observation(
            timestamp=args['timestamp'],
            parameter=parameter,
            value=args['value'])
        kid.add_observation(observation)
        # kid.save()
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
        observation.timestamp = args['timestamp']
        observation.value = args['value']
        observation.parameter = parameter
        current_identity.save()
        return self.object_response(observation)

    @jwt_required()
    def delete(self, kid_id, observation_id):
        # observation = self.get_observation_or_404(kid_id, observation_id)
        # kid = current_identity.get_kid_by_id(kid_id)

        # kid.update(pull__observations=observation)

        a = current_identity.update(pull__kids__observations__id=observation_id)
        b = models.User.objects(id=current_identity.id).update_one(pull__kids__observations__id=observation_id)
        current_identity.save()
        current_identity.reload()
        print('------')
        print(current_identity.kids)
        kid = current_identity.get_kid_by_id(kid_id)
        print(kid)
        print(kid.observations)
        print(a)
        print(b)
        print('------')
        return {'success': True}
