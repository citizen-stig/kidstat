# -*- encoding: utf-8 -*-
import sys
import os
import importlib
from flask import Flask, request, url_for, redirect
from flask_admin import Admin
from flask_restful import Api

from flask_debugtoolbar import DebugToolbarExtension
from flask_security import Security, MongoEngineUserDatastore
from kidstat.models import db, User, Role, Parameter, Standard
from kidstat.api import api_blueprint, ParameterResource, KidResource


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
    user_datastore = MongoEngineUserDatastore(db, User, Role)
    security = Security(app, user_datastore)
    return security, user_datastore


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
    api = Api(api_blueprint)
    api.add_resource(ParameterResource, '/parameters')
    api.add_resource(KidResource, '/kids')
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')
    return api


def setup_debug_toolbar(app):
    toolbar = DebugToolbarExtension(app)
    return toolbar
