import os
import importlib
from flask import Flask, render_template
from flask_admin import Admin
from flask_mail import Mail
from flask_jwt import JWT
from flask_security import Security

from kidstat.models import db, User, Role, Parameter, Standard, user_datastore
from kidstat import auth


from kidstat.api.factory import setup_api
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
    Mail(app)

    @app.route('/')
    def home():
        return render_template('index.html')

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
    admin_portal.add_view(admin.AdminProtectedModelView(Standard))
    return admin_portal


def create_full_app():
    app = create_app()
    setup_security(app)
    setup_admin(app)
    setup_api(app)
    return app
