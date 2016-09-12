from marshmallow import fields, validate, Schema
from kidstat import models
from .base import MarshMallowResource
from ..schemas.parameters import ParameterSchema


class ParametersListResource(MarshMallowResource):
    schema = ParameterSchema(many=True)

    def get(self):
        return self.list_response(models.Parameter.objects.all())


class ParameterResource(MarshMallowResource):
    schema = ParameterSchema()

    def get(self, parameter_name):
        return self.object_response(
            models.Parameter.objects.filter(name=parameter_name).first())
