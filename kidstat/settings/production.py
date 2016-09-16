import os
from .base import Config as BaseConfig
from .base import get_mongodb_settings


class Config(BaseConfig):
    DEBUG = False
    SECRET_KEY = os.environ['FLASK_SECRET_KEY']
    SECURITY_PASSWORD_SALT = os.environ['FLASK_PASSWORD_SALT']
    MONGODB_SETTINGS = get_mongodb_settings()
