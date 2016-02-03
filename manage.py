# -*- encoding: utf-8 -*-
from flask_script import Manager, Command, Option
from flask_security import MongoEngineUserDatastore
from kidstat import app as app_factory
from kidstat.models import db, User, Role, ADMIN_ROLE


class CreateAdminUser(Command):

    option_list = (
        Option('--email', '-e', dest='email'),
        Option('--password', '-p', dest='password'),
    )

    def run(self, email, password):
        user_datastore = MongoEngineUserDatastore(db, User, Role)
        admin_role = user_datastore.find_or_create_role(ADMIN_ROLE)
        admin_user = User(email=email)
        admin_user.set_password(password)
        user_datastore.add_role_to_user(admin_user, admin_role)
        admin_user.save()


if __name__ == "__main__":
    app = app_factory.create_app()
    app_factory.setup_security(app)
    app_factory.setup_admin(app)
    app_factory.setup_api(app)
    app_factory.setup_debug_toolbar(app)
    manager = Manager(app)
    manager.add_command("createsuperuser", CreateAdminUser())
    manager.run()
