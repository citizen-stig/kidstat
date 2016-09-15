import {describe, it} from 'mocha';
import {assert, expect} from 'chai'

import parameters from '../src/reducers/parameters.js';
import sampleObservation from '../src/reducers/sample-observation.js';
import {
    GET_PARAMETERS,
    GET_SAMPLE_OBSERVATION_CATEGORY
} from '../src/actions.jsx';


describe('Parameters Reducer Test', function () {
    it('should return empty array as for undefined action', function () {
        expect(parameters(undefined, {})).to.deep.equal([]);
    });
    it('should return parameters on get parameters action', function () {
        expect(parameters(undefined, {type: GET_PARAMETERS})).to.deep.equal(
            [
                {
                    'id': 1, 'name': 'weight', 'unit': 'kg',
                    'description': 'Sample description'
                },
                {
                    'id': 2, 'name': 'height', 'unit': 'cm',
                    'description': 'This is looong'
                }
            ])
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
