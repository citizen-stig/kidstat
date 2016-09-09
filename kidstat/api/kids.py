from flask_jwt import jwt_required, current_identity
from flask_restful import abort
from marshmallow import fields, validate, Schema
from webargs.flaskparser import use_args
from kidstat import models

from .base import MarshMallowResource


class KidSchema(Schema):
    id = fields.String(dump_only=True)
    name_field = fields.String(attribute='name', dump_to='name',
                               load_from='name', required=True)
    gender = fields.String(required=True,
                           validate=validate.OneOf(
                               choices=(models.MALE, models.FEMALE)))
    birthday = fields.DateTime(required=True, format='iso8601')


class KidsListResource(MarshMallowResource):
    schema = KidSchema()

    @jwt_required()
    def get(self):
        return self.list_response(current_identity.kids)

    @jwt_required()
    @use_args(KidSchema(strict=True))
    def post(self, args):
        existed_kid = current_identity.get_kid_by_name(args['name'])
        if existed_kid is None:
            kid = models.Kid(
                name=args['name'],
                birthday=args['birthday'],
                gender=args['gender'])
            # TODO: might be issues with multiple threads
            current_identity.kids.append(kid)
            current_identity.save()
            return self.object_response(kid)
        return abort(409, error="Kid with this name already exists",
                     success=False)


class KidResource(MarshMallowResource):
    schema = KidSchema()

    @staticmethod
    def get_kid_or_404(kid_id):
        kid = current_identity.get_kid_by_id(kid_id)
        if kid is None:
            abort(404)
        return kid

    @jwt_required()
    def get(self, kid_id):
        return self.object_response(self.get_kid_or_404(kid_id))

    @jwt_required()
    @use_args(KidSchema(strict=True))
    def put(self, args, kid_id):
        kid = self.get_kid_or_404(kid_id)
        kid.name = args['name']
        kid.gender = args['gender']
        kid.birthday = args['birthday']
        current_identity.save()
        return self.object_response(current_identity.get_kid_by_id(kid_id))

    @jwt_required()
    def delete(self, kid_id):
        kid = self.get_kid_or_404(kid_id)
        current_identity.update(pull__kids=kid)
        current_identity.save()
        return {'success': True}
