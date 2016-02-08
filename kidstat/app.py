# -*- encoding: utf-8 -*-
import os
import importlib
from flask import Flask
from flask_admin import Admin
from flask_restful import Api
from flask_jwt import JWT
from flask_debugtoolbar import DebugToolbarExtension
from flask_security import Security
from kidstat.models import db, User, Role, Parameter, user_datastore
from kidstat import auth
from kidstat import api


from kidstat import admin


def create_app():
    app = Flask(__name__)
    settings = os.getenv('FLASK_SETTINGS', 'develop')
    try:
        config_module = importlib.import_module('kidstat.settings.' + settings)
        config_obj = config_module.Config
    except (ImportError, AttributeError):
        config_module = importlib.import_module('kidstat.settings.' + 'develop')
        config_obj = config_module.Config

    app.config.from_object(config_obj)
    db.init_app(app)

    return app


def setup_security(app):
    """Setup Flask-Security"""
    jwt = JWT(app, auth.authenticate, auth.get_user_from_payload)
    jwt.jwt_payload_handler(auth.payload_handler)

    security = Security(app, user_datastore)
    return security, jwt


def setup_admin(app):
    """
    :param app:
    :return:
    """
    admin_portal = Admin(app,
                         name='kidstat',
                         index_view=admin.AdminProtectedIndexView(),
                         template_mode='bootstrap3',
                         url='/admin')
    admin_portal.add_view(admin.UserModelView(User))
    admin_portal.add_view(admin.AdminProtectedModelView(Role))
    admin_portal.add_view(admin.AdminProtectedModelView(Parameter))
    return admin_portal


def setup_api(app):
    api_instance = Api(app, prefix='/api/v1')
    api_instance.add_resource(api.ParametersListResource,
                              '/parameters',
                              endpoint='parameters_list')
    api_instance.add_resource(api.ParameterResource,
                              '/parameters/<string:parameter_name>',
                              endpoint='parameter_object')
    api_instance.add_resource(api.KidsListResource,
                              '/kids',
                              endpoint='kids_list')
    api_instance.add_resource(api.KidResource,
                              '/kids/<string:kid_id>',
                              endpoint='kids_object')
    api_instance.add_resource(api.ObservationsListResource,
                              '/kids/<string:kid_id>/observations',
                              endpoint='observations_list')
    return api


def setup_debug_toolbar(app):
    toolbar = DebugToolbarExtension(app)
    return toolbar
