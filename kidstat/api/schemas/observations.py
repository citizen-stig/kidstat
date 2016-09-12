from marshmallow import fields

from .base import BaseObservationSchema, BaseKidSchema


class ObservationSchema(BaseObservationSchema):
    id = fields.String(dump_only=True)


class SampleObservationSchema(BaseKidSchema, ObservationSchema):
    pass
