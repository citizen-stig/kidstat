from marshmallow import fields, validate, Schema, ValidationError
from kidstat import models


DT_FORMAT = '%Y-%m-%d'


def validate_parameter(parameter_name):
    parameter = models.Parameter.objects \
        .filter(name=parameter_name).first()
    if parameter is None:
        raise ValidationError('No Such Parameter: {0}'.format(parameter_name))


class BaseKidSchema(Schema):
    gender = fields.String(required=True,
                           validate=validate.OneOf(
                               choices=(models.MALE, models.FEMALE)))
    birthday = fields.DateTime(required=True, format=DT_FORMAT)


class BaseObservationSchema(Schema):
    timestamp = fields.DateTime(required=True, format=DT_FORMAT)
    parameter = fields.String(required=True, validate=validate_parameter)
    value = fields.Float(required=True, validate=validate.Range(min=0))
