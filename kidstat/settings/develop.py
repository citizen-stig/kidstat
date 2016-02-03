# -*- encoding: utf-8 -*-
from .base import Config as BaseConfig


class Config(BaseConfig):
    DEBUG = True
    SECRET_KEY = 'super-secret'
    DEBUG_TB_PANELS = [
        'flask_debugtoolbar.panels.versions.VersionDebugPanel',
        'flask_debugtoolbar.panels.headers.HeaderDebugPanel',
        'flask_debugtoolbar.panels.request_vars.RequestVarsDebugPanel',
        'flask_debugtoolbar.panels.config_vars.ConfigVarsDebugPanel',
        'flask_debugtoolbar.panels.template.TemplateDebugPanel',
        # https://github.com/MongoEngine/flask-mongoengine/issues/157
        # 'flask.ext.mongoengine.panels.MongoDebugPanel',
        'flask_debugtoolbar.panels.logger.LoggingPanel',
        'flask_debugtoolbar.panels.route_list.RouteListDebugPanel',
        'flask_debugtoolbar.panels.profiler.ProfilerDebugPanel',
    ]
    SECURITY_PASSWORD_SALT = 'd3v3l0p_s41t'