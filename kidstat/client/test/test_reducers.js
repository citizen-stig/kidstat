import {describe, it} from 'mocha';
import {assert, expect} from 'chai'

import parameters from '../src/reducers/parameters.js';
import sampleObservation from '../src/reducers/sample-observation.js';
import {
    GET_PARAMETERS,
    CHANGE_SAMPLE_OBSERVATION,
    GET_SAMPLE_OBSERVATION_CATEGORY
} from '../src/actions.js';

describe('Reducers', function () {


    describe('Parameters Reducer', function () {
        it('should return initial state if current state is undefined',
            function () {
                const expectedState = {data: [], isFetching: false, errors: []};
                expect(parameters(undefined, {})).to.deep.equal(expectedState);
            });
        it('should return current state if action is unknown', function () {
            const currentState = {data: [], isFetching: true, errors: []};
            expect(parameters(currentState, {type: 'QWE'})).to.deep.equal(
                currentState)
        });
        it('should change isFetching on get parameters action', function () {
            // undefined action.status means that request should be performed
            const expectedState = {data: [], isFetching: true, errors: []};
            expect(parameters(undefined, {type: GET_PARAMETERS})).to.deep.equal(
                expectedState
            )
        });
        it('should reset errors on new request', function () {
            const currentState = {
                data: [],
                isFetching: false,
                errors: ['something']
            };
            const expectedState = {
                data: [],
                isFetching: true,
                errors: []
            };
            expect(parameters(currentState, {type: GET_PARAMETERS})).to.deep.equal(
                expectedState
            )
        });
        it('should add parameters to state after response is succeeded', function () {
            const currentState = {
                data: [],
                isFetching: true,
                errors: []
            };
            const parametersData = [
                {id: 1, name: 'weight', unit: 'kg', description: 'something'},
                {
                    id: 2,
                    name: 'height',
                    unit: 'cm',
                    description: 'something new'
                }
            ];
            const expectedState = {
                data: parametersData,
                isFetching: false,
                errors: []
            };
            const action = {
                type: GET_PARAMETERS,
                status: 'success',
                response: parametersData
            };
            expect(parameters(currentState, action)).to.deep.equal(expectedState)
        })
    });

    describe('Sample Observation Reducer', function () {
        it('should return initial state', function () {
            const expectedState = {
                data: {
                    category: '',
                    gender: 'male',
                    birthday: '',
                    timestamp: new Date().toISOString().split("T")[0],
                    parameter: '',
                    value: '',
                    isValid: false
                },
                isFetching: false, errors: []
            };
            expect(sampleObservation(undefined, {})).to.deep.equal(expectedState);
        });
        it('should return current state if action is unknown', function () {
            const currentState = {
                data: {
                    category: '',
                    gender: 'male',
                    birthday: '',
                    timestamp: new Date().toISOString().split("T")[0],
                    parameter: '',
                    value: '',
                    isValid: false
                },
                isFetching: false, errors: []
            };
            expect(sampleObservation(currentState, {type: 'QWE'})).to.deep.equal(
                currentState)
        });
        it('should change isFetching on get sample observation action',
            function () {
                // undefined action.status means that request should be performed
                const expectedState = {
                    data: {
                        category: '',
                        gender: 'male',
                        birthday: '',
                        timestamp: new Date().toISOString().split("T")[0],
                        parameter: '',
                        value: '',
                        isValid: false
                    },
                    isFetching: true,
                    errors: []
                };
                const action = {type: GET_SAMPLE_OBSERVATION_CATEGORY};
                expect(sampleObservation(undefined, action))
                    .to.deep.equal(expectedState)
            });
        it('should reset "category" on get sample observation action',
            function () {
                const currentState = {
                    data: {
                        category: 'Very Low',
                        gender: 'male',
                        birthday: '2016-01-01',
                        timestamp: new Date().toISOString().split("T")[0],
                        parameter: 'param1',
                        value: '123',
                        isValid: true
                    },
                    isFetching: false,
                    errors: []
                };
                const expectedState = {
                    data: {
                        category: '',
                        gender: 'male',
                        birthday: '2016-01-01',
                        timestamp: new Date().toISOString().split("T")[0],
                        parameter: 'param1',
                        value: '123',
                        isValid: true
                    },
                    isFetching: true,
                    errors: []
                };
                const action = {type: GET_SAMPLE_OBSERVATION_CATEGORY};
                expect(sampleObservation(currentState, action))
                    .to.deep.equal(expectedState)
            });
        it('should change only data key presented in action', function () {
            const expectedState = {
                data: {
                    category: '',
                    gender: 'male',
                    birthday: '',
                    timestamp: new Date().toISOString().split("T")[0],
                    parameter: '',
                    value: '123',
                    isValid: false
                },
                isFetching: false,
                errors: []
            };
            const action = {
                type: CHANGE_SAMPLE_OBSERVATION,
                data: {value: '123'}
            };
            expect(sampleObservation(undefined, action)).to.deep.equal(expectedState);
        })

    });
});