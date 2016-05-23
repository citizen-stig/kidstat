# -*- encoding: utf-8 -*-
from flask import jsonify
from flask_restful import Resource, abort
from webargs.flaskparser import parser


@parser.error_handler
def handle_request_parsing_error(error):
    """
    webargs error handler that uses Flask-RESTful's abort function to return
    a JSON error response to the client.
    :param error:
    :return:
    """
    return abort(422, errors=error.messages)


class MarshMallowResource(Resource):
    """
    Returns object or list of objects from Marshmallow Schema
    """
    schema = None

    def object_response(self, data):
        result = self.schema.dump(data)
        return jsonify(result.data)

    def list_response(self, data):
        result = self.schema.dump(data, many=True)
        return jsonify({'data': result.data})
