import {before, describe, it} from 'mocha';
import {assert, expect} from 'chai'
import {genericErrorsHandler} from '../src/utils.js'

describe('Utils', function () {

    describe('Generic Error Handler', function () {
        let type = 'MY_TYPE';
        it('should return "message" from server in array of 1 element',
            function () {
                let msg = "Server Error";
                let json = {"message": msg};
                let expectedAction = {
                    type: type,
                    status: 'error',
                    errors: [msg]
                };
                expect(genericErrorsHandler(type, json))
                    .to.deep.equal(expectedAction)
            }
        );
        it('should return array of errors as is, if "errors" is array',
            function () {
                let error1 = "Error 1";
                let error2 = "Error 2";
                let errors = [error1, error2];
                let json = {"errors": errors};
                let expectedAction = {
                    type: type,
                    status: 'error',
                    errors: errors
                };
                expect(genericErrorsHandler(type, json))
                    .to.deep.equal(expectedAction)
            });
        it('should return array of concatenated keys and values if "errors" is "plain" object',
            function () {
                let errors = {
                    "birthday": "Not a valid datetime.",
                    "value": "Not a valid number.",
                };
                let json = {"errors": errors};
                let expectedErrors = [
                    "birthday: Not a valid datetime.",
                    "value: Not a valid number."
                ];
                let expectedAction = {
                    type: type, status: 'error', errors: expectedErrors
                };
                expect(genericErrorsHandler(type, json))
                    .to.deep.equal(expectedAction)
            });
        it('should return array of concatenated keys and values if "errors" is "embedded" object',
            function () {
                let errors = {
                    "birthday": [
                        "Not a valid datetime."
                    ],
                    "value": [
                        "Not a valid number.",
                        "Too long input."
                    ]
                };
                let json = {"errors": errors};
                let expectedErrors = [
                    "birthday: Not a valid datetime.",
                    "value: Not a valid number.",
                    "value: Too long input."
                ];
                let expectedAction = {
                    type: type, status: 'error', errors: expectedErrors
                };
                expect(genericErrorsHandler(type, json))
                    .to.deep.equal(expectedAction)
            });
        it('should return ["Unknown error"] if json does not have known keys',
            function () {
                let json = {"server": "this is just error"};
                let expectedAction = {
                    type: type, status: "error", errors: ["Unknown Error"]
                };
                expect(genericErrorsHandler(type, json))
                    .to.deep.equal(expectedAction)
            })
    });

});