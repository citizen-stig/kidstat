# -*- encoding: utf-8 -*-
from flask import jsonify
from flask_jwt import jwt_required, current_identity
from flask_restful import Resource, abort
from flask_security.registerable import register_user
from marshmallow import fields, validate, Schema
from webargs.flaskparser import parser, use_args
from kidstat import models
import mongoengine.errors


@parser.error_handler
def handle_request_parsing_error(error):
    """
    webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    :param error:
    :return:
    """
    return abort(422, errors=error.messages)


class MarshMallowResource(Resource):
    schema = None

    def object_response(self, data):
        result = self.schema.dump(data)
        return jsonify(result.data)

    def list_response(self, data):
        result = self.schema.dump(data, many=True)
        return jsonify({'data': result.data})


class CheckTokenResource(Resource):

    @jwt_required()
    def get(self):
        return {"success": True}


# PARAMETER
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


# Kid
class KidSchema(Schema):
    id = fields.String(dump_only=True)
    name_field = fields.String(attribute='name', dump_to='name',
                               load_from='name', required=True)
    gender = fields.String(required=True,
                           validate=validate.OneOf(
                               choices=(models.MALE, models.FEMALE)))
    birthday = fields.DateTime(required=True, format='iso8601')


class KidsListResource(MarshMallowResource):
    schema = KidSchema()

    @jwt_required()
    def get(self):
        return self.list_response(current_identity.kids)

    @jwt_required()
    @use_args(KidSchema(strict=True))
    def post(self, args):
        kid = models.Kid(
            name=args['name'],
            birthday=args['birthday'],
            gender=args['gender'])
        current_identity.kids.append(kid)
        current_identity.save()
        return self.object_response(kid)


class KidResource(MarshMallowResource):
    schema = KidSchema()

    @jwt_required()
    def get(self, kid_id):
        return self.object_response(current_identity.get_kid_by_id(kid_id))

    @jwt_required()
    @use_args(KidSchema(strict=True))
    def put(self, args, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        kid.name = args['name']
        kid.gender = args['gender']
        kid.birthday = args['birthday']
        current_identity.save()
        return self.object_response(current_identity.get_kid_by_id(kid_id))

    @jwt_required()
    def delete(self, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        current_identity.update(pull__kids=kid)
        current_identity.save()
        return {'success': True}


# OBSERVATION
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


# Registration
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
            abort(422, errors=str(exc))
