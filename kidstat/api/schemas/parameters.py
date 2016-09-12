from marshmallow import fields, Schema


class ParameterSchema(Schema):
    name = fields.String(attribute='name', dump_to='name', required=True)
    unit = fields.String(required=True)
    description = fields.String(required=True)
