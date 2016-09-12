from marshmallow import fields

from .base import BaseKidSchema


class KidSchema(BaseKidSchema):
    id = fields.String(dump_only=True)
    name_field = fields.String(attribute='name', dump_to='name',
                               load_from='name', required=True)
