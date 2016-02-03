# -*- encoding: utf-8 -*-
from .base import Config as BaseConfig


class Config(BaseConfig):
    DEBUG = True
    TESTING = True
    MONGODB_DB = 'test_kidstat'
    SECRET_KEY = 'testingkey'
    WTF_CSRF_ENABLED = False
    LIVESERVER_PORT = 5151