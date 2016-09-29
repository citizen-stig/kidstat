import {after, before, describe, it} from 'mocha';
import {assert, expect} from 'chai'

import {
    requestParameters,
    fetchParameters,
    receiveParameters,
    requestCategoryForSampleObservation,
    receiveCategoryForSampleObservation,
    GET_PARAMETERS,
    GET_SAMPLE_OBSERVATION_CATEGORY,
    __RewireAPI__ as ActionsRewire
} from '../src/actions.js';

describe('Actions', function () {


    describe('Parameters Actions', function () {

        var getBody;
        before(function () {
            ActionsRewire.__Rewire__('get', function ({url}) {
                assert.equal(url, 'parameters');
                return Promise.resolve(getBody);
            });
        });

        after(function () {
            ActionsRewire.__ResetDependency__('get');
        });

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
        });
        it('should dispatch requestParameters and then receiveParameters',
            function (done) {
                var parametersData = [
                    {name: 'Param1', unit: 'cm', description: 'test'},
                    {name: 'Param2', unit: 'kg', description: 'woot'}
                ];
                getBody = {data: parametersData};
                var requesting = true;
                var requestingChecked = false;
                var receivingChecked = false;
                var fakeDispatch = function (action) {
                    if (requesting) {
                        // Assert request parameter action
                        expect(action).to.deep.equal({type: GET_PARAMETERS});
                        requesting = false;
                        requestingChecked = true;
                    } else {
                        // Assert receive parameter action
                        expect(action).to.deep.equal(
                            {
                                type: GET_PARAMETERS,
                                status: 'success',
                                response: parametersData
                            }
                        );
                        receivingChecked = true;
                    }
                };
                var fetchMiddleware = fetchParameters();
                fetchMiddleware(fakeDispatch).then(function () {
                    assert.ok(requestingChecked);
                    assert.ok(receivingChecked);
                    done()
                });
            })
    });

    describe('Sample Observation Action', function () {
        it('should return only type requestCategoryForSampleObservation',
            function () {
                expect(requestCategoryForSampleObservation()).to
                    .deep.equal({type: GET_SAMPLE_OBSERVATION_CATEGORY}
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


});