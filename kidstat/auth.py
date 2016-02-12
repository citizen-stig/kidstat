# -*- encoding: utf-8 -*-
from flask_jwt import _default_jwt_payload_handler
from kidstat import models


def authenticate(email, password):
    try:
        user = models.User.objects.get(email=email)
        if user.check_password(password):
            return user
    except models.User.DoesNotExist:
        pass


def get_user_from_payload(payload):
    user_id = payload['identity']
    try:
        return models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        pass


def payload_handler(identity):
    payload = _default_jwt_payload_handler(identity)
    payload['identity'] = str(payload['identity'])
    return payload
