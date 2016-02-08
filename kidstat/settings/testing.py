# -*- encoding: utf-8 -*-
from .base import Config as BaseConfig


class Config(BaseConfig):
    DEBUG = True
    TESTING = True
    MONGODB_SETTINGS = {
        'db': 'test_kidstat',
        'host': 'localhost',
        'port': 27017,
        'tz_aware': True
    }
    SECRET_KEY = 'testingkey'
    WTF_CSRF_ENABLED = False
    LIVESERVER_PORT = 5151
