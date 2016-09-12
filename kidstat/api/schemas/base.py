from marshmallow import fields, validate, post_load, Schema, ValidationError
import pytz
from kidstat import models


def validate_parameter(parameter_name):
    parameter = models.Parameter.objects \
        .filter(name=parameter_name).first()
    if parameter is None:
        raise ValidationError('No Such Parameter: {0}'.format(parameter_name))


class BaseKidSchema(Schema):
    gender = fields.String(required=True,
                           validate=validate.OneOf(
                               choices=(models.MALE, models.FEMALE)))
    birthday = fields.DateTime(required=True, format='iso8601')


class BaseObservationSchema(Schema):
    timestamp = fields.DateTime(required=True, format='iso8601')
    parameter = fields.String(required=True, validate=validate_parameter)
    value = fields.Float(required=True, validate=validate.Range(min=0))

    # @post_load
    # def annotate_tz_info(self, data):
    #     timestamp = data['timestamp']
    #     if timestamp.tzinfo is None:
    #         data['timestamp'] = timestamp.replace(tzinfo=pytz.UTC)
    #     return data
