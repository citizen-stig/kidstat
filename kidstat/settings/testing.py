from .base import Config as BaseConfig


class Config(BaseConfig):
    DEBUG = False
    TESTING = True
    MONGODB_SETTINGS = {
        'db': 'test_kidstat',
        'host': 'localhost',
        'port': 27017,
    }
    SECRET_KEY = 'testingkey'
    WTF_CSRF_ENABLED = False
    # JWT_VERIFY = False
    JWT_VERIFY_EXPIRATION = False
    # JWT_ALGORITHM = 'none'
    LIVESERVER_PORT = 5151
    SECURITY_PASSWORD_HASH = 'plaintext'
