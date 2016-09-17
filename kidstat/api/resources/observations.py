from flask import jsonify
from flask_jwt import jwt_required, current_identity
from flask_restful import abort, Resource
from webargs.flaskparser import use_args
from kidstat import models
from .base import MarshMallowResource
from ..schemas.observations import ObservationSchema, SampleObservationSchema


class ObservationsListResource(MarshMallowResource):
    schema = ObservationSchema()

    @jwt_required()
    def get(self, kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        if kid:
            return self.list_response(kid.observations)
        abort(404)

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
        kid.save()
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
        abort(404)

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
        kid = current_identity.get_kid_by_id(kid_id)
        if kid:
            observation = kid.get_observation_by_id(observation_id)
            if observation:
                kid.observations.remove(observation)
                kid.save()
                return {'success': True}
        abort(404)


class SampleObservationResource(Resource):

    @use_args(SampleObservationSchema(strict=True))
    def post(self, args):
        kid = models.Kid(birthday=args['birthday'],
                         gender=args['gender'])
        parameter = models.Parameter.objects \
            .filter(name=args['parameter']).first()
        observation = models.Observation(parameter=parameter,
                                         timestamp=args['timestamp'],
                                         value=args['value'])
        observation._instance = kid
        try:
            category = observation.get_category()
            return jsonify({"success": True,
                            'category': category.pretty})
        except ValueError as exc:
            abort(422, errors=[str(exc)])
