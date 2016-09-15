import {describe, it} from 'mocha';
import {assert, expect} from 'chai'

import parameters from '../src/reducers/parameters.js';
import sampleObservation from '../src/reducers/sample-observation.js';
import {
    GET_PARAMETERS,
    GET_SAMPLE_OBSERVATION_CATEGORY
} from '../src/actions.jsx';


describe('Parameters Reducer Test', function () {
    it('should return initial state if current state is undefined',
        function () {
            const expectedState = {data: [], isFetching: false, errors: []};
            expect(parameters(undefined, {})).to.deep.equal(expectedState);
    });
    it('should return current state if action is unknown', function(){
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
    it('should reset errors on new request', function(){
        const currentState = {
            data: [],
            isFetching: false,
            errors: ['something']};
        const expectedState = {
            data: [],
            isFetching: true,
            errors: []
        };
        expect(parameters(currentState, {type: GET_PARAMETERS})).to.deep.equal(
            expectedState
        )
    });
    it('should add parameters to state after response is succeeded', function(){
        const currentState = {
            data: [],
            isFetching: true,
            errors: []
        };
        const parametersData = [
            {id: 1, name: 'weight', unit: 'kg', description: 'something'},
            {id: 2, name: 'height', unit: 'cm', description: 'something new'}
        ];
        const expectedState = {
            data: parametersData,
            isFetching: false,
            errors: []
        };
        const action = {
            type: GET_PARAMETERS,
            status: 'success',
            response: parametersData};
        expect(parameters(currentState, action)).to.deep.equal(expectedState)
    })
});

describe('Sample Observation Reducer Test', function () {
    it('should return empty object for undefined action', function () {
        expect(sampleObservation(undefined, {})).to.deep.equal({});
    });
    it('should return low category for value less 50', function () {
        let observation = {value: 49};
        expect(sampleObservation(
            undefined,
            {type: GET_SAMPLE_OBSERVATION_CATEGORY, observation})
        ).to.deep.equal({category: 'Low'})
    });
});
