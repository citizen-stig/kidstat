from datetime import timedelta


class Config(object):
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        'db': 'kidstat',
        'host': 'localhost',
        'port': 27017,
    }
    SECURITY_PASSWORD_HASH = 'pbkdf2_sha512'
    SECURITY_PASSWORD_SALT = 'justsalt'
    SECURITY_CONFIRMABLE = False
    SECURITY_SEND_REGISTER_EMAIL = False
    JWT_AUTH_URL_RULE = '/api/v1/auth'
    JWT_AUTH_USERNAME_KEY = 'email'
    JWT_EXPIRATION_DELTA = timedelta(hours=12)
    # SECURITY_CHANGEABLE = True
    # SECURITY_CHANGE_PASSWORD_TEMPLATE = 'auth/change_password.html'
    # SECURITY_RECOVERABLE = True
    # SECURITY_FORGOT_PASSWORD_TEMPLATE = 'auth/forgot_password.html'
    # SECURITY_RESET_PASSWORD_TEMPLATE = 'auth/reset_password.html'
    # SECURITY_LOGIN_USER_TEMPLATE = 'auth/login.html'
    SOCIAL_FACEBOOK = {
        'consumer_key': '288802541458761',
        'consumer_secret': 'TBD'
    }
