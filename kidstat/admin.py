# -*- encoding: utf-8 -*-
from flask import request, redirect, url_for
from flask_admin import AdminIndexView, expose
from flask_admin.contrib.mongoengine import ModelView
from flask_security import current_user, roles_required, login_required
from wtforms.fields import PasswordField

from kidstat.models import ADMIN_ROLE


class AdminProtectedIndexView(AdminIndexView):

    @expose()
    @login_required
    @roles_required(ADMIN_ROLE)
    def index(self):
        return super().index()


class AdminProtectedModelView(ModelView):

    def is_accessible(self):
        if not current_user.is_active() or not current_user.is_authenticated():
            return False
        if current_user.has_role(ADMIN_ROLE):
            return True
        return False

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('security.login', next=request.url))


class UserModelView(AdminProtectedModelView):
    column_searchable_list = ('first_name', 'email')
    column_exclude_list = ('password',)
    form_overrides = dict(password=PasswordField)

    def on_model_change(self, form, user, is_created=False):
        user.set_password(form.password.data)
