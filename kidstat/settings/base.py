# -*- encoding: utf-8 -*-


class Config(object):
    DEBUG = False
    TESTING = False
    MONGODB_DB = 'kidstat'
    MONGODB_HOST = 'localhost'
    MONGODB_PORT = 27017
    SECURITY_PASSWORD_HASH = 'pbkdf2_sha512'
    SECURITY_PASSWORD_SALT = 'justsalt'
    # SECURITY_CHANGEABLE = True
    # SECURITY_CHANGE_PASSWORD_TEMPLATE = 'auth/change_password.html'
    # SECURITY_RECOVERABLE = True
    # SECURITY_FORGOT_PASSWORD_TEMPLATE = 'auth/forgot_password.html'
    # SECURITY_RESET_PASSWORD_TEMPLATE = 'auth/reset_password.html'
    # SECURITY_LOGIN_USER_TEMPLATE = 'auth/login.html'

