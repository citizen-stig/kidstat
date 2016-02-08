# -*- encoding: utf-8 -*-


class Config(object):
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        'db': 'kidstat',
        'host': 'localhost',
        'port': 27017,
        'tz_aware': True
    }
    SECURITY_PASSWORD_HASH = 'pbkdf2_sha512'
    SECURITY_PASSWORD_SALT = 'justsalt'
    JWT_AUTH_URL_RULE = '/api/v1/auth'
    JWT_AUTH_USERNAME_KEY = 'email'

    # SECURITY_CHANGEABLE = True
    # SECURITY_CHANGE_PASSWORD_TEMPLATE = 'auth/change_password.html'
    # SECURITY_RECOVERABLE = True
    # SECURITY_FORGOT_PASSWORD_TEMPLATE = 'auth/forgot_password.html'
    # SECURITY_RESET_PASSWORD_TEMPLATE = 'auth/reset_password.html'
    # SECURITY_LOGIN_USER_TEMPLATE = 'auth/login.html'


