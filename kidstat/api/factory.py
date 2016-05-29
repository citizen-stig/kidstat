# -*- encoding: utf-8 -*-
from flask_restful import Api

from . import auth, parameters, kids, observations


def setup_api(app):
    api = Api(app, prefix='/api/v1')
    # Auth
    api.add_resource(
        auth.CheckTokenResource,
        '/check-token',
        endpoint='check-token')
    api.add_resource(
        auth.FacebookAuth,
        '/facebook-login',
        endpoint='facebook-login')
    api.add_resource(
        auth.RegistrationResource,
        '/register',
        endpoint='register')
    # Parameters
    api.add_resource(
        parameters.ParametersListResource,
        '/parameters',
        endpoint='parameters_list')
    api.add_resource(
        parameters.ParameterResource,
        '/parameters/<string:parameter_name>',
        endpoint='parameter_object')
    # Kids
    api.add_resource(
        kids.KidsListResource,
        '/kids',
        endpoint='kids_list')
    api.add_resource(
        kids.KidResource,
        '/kids/<string:kid_id>',
        endpoint='kids_object')
    # Observations
    api.add_resource(
        observations.ObservationsListResource,
        '/kids/<string:kid_id>/observations',
        endpoint='observations_list')
    api.add_resource(
        observations.ObservationResource,
        '/kids/<string:kid_id>/observations/<string:observation_id>',
        endpoint='observation_object')
    return api
