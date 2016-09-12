from marshmallow import fields, Schema, validate


class RegistrationSchema(Schema):
    email = fields.Email(required=True, validate=validate.Email())
    password = fields.String(required=True, validate=validate.Length(min=8))
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class FacebookAuthSchema(Schema):
    access_token = fields.String(load_from='accessToken',
                                 dump_to='access_token',
                                 required=True)
