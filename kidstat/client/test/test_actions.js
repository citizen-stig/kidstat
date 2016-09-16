import {describe, it} from 'mocha';
import {assert, expect} from 'chai'

import {
    requestParameters,
    receiveParameters,
    requestCategoryForSampleObservation,
    receiveCategoryForSampleObservation,
    GET_PARAMETERS,
    GET_SAMPLE_OBSERVATION_CATEGORY
} from '../src/actions.jsx';

describe('Parameters Actions Test', function () {
    it('should return only type for requestParameters', function () {
        expect(requestParameters()).to.deep.equal({type: GET_PARAMETERS})
    });
    it('should add status and response for receiveParameters', function () {
        const json = {data: 'somedata'};
        expect(receiveParameters(json)).to.deep.equal({
            type: GET_PARAMETERS,
            status: 'success',
            response: json.data
        })
    })
});

describe('Sample Observation Action Test', function () {
    it('should TBD requestCategoryForSampleObservation',
        function () {
            const observation = {value: 123};
            expect(requestCategoryForSampleObservation(observation)).to
                .deep.equal(
                {
                    type: GET_SAMPLE_OBSERVATION_CATEGORY,
                    data: observation
                }
            )
        });
    it('should return category for receiveCategoryForSampleObservation',
        function () {
            const json = {category: 'Average'};
            expect(receiveCategoryForSampleObservation(json)).to.deep.equal(
                {
                    type: GET_SAMPLE_OBSERVATION_CATEGORY,
                    status: 'success',
                    response: json
                }
            )
        })
});