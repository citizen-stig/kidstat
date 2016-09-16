import 'whatwg-fetch';
import {get, post} from './api.js';

// Parameters
export const GET_PARAMETERS = 'GET_PARAMETERS';
export function requestParameters() {
    return {type: GET_PARAMETERS};
}

export function receiveParameters(json) {
    return {
        type: GET_PARAMETERS,
        status: 'success',
        response: json.data
    }
}

function genericErrorsHandler(type, json) {
    let errors;
    if ("message" in json) {
        errors = [json['message']];
    } else if ("errors" in json) {
        errors = json['errors']
    } else {
        errors = ['Unknown Error'];
    }
    return {
        type: type,
        status: 'error',
        errors: errors
    }

}

export function handleParametersErrors(json) {
    return genericErrorsHandler(GET_PARAMETERS, json);
}

export function fetchParameters() {
    return function (dispatch) {

        dispatch(requestParameters());
        return get({url: 'parameters'}).then()
            .then(json =>
                dispatch(receiveParameters(json))
            ).catch(function (error) {
                console.log('Error in fetchParameters');
                console.log(error);
                if (error.response) {
                    return error.response.json()
                        .then(json => dispatch(handleParametersErrors(json)))
                }
                return dispatch(handleParametersErrors({}))
            });
    }
}


// Sample Observations
export const GET_SAMPLE_OBSERVATION_CATEGORY = 'GET_SAMPLE_OBSERVATION_CATEGORY';
export const CHANGE_SAMPLE_OBSERVATION = 'CHANGE_SAMPLE_OBSERVATION';

export function changeSampleObservation(observation){
    return {type: CHANGE_SAMPLE_OBSERVATION, data: observation}
}

export function requestCategoryForSampleObservation() {
    return {type: GET_SAMPLE_OBSERVATION_CATEGORY,}
}

export function receiveCategoryForSampleObservation(json) {
    return {
        type: GET_SAMPLE_OBSERVATION_CATEGORY,
        status: 'success',
        response: json
    }
}

export function handleCategoryForSampleObservationErrors(json){
    return genericErrorsHandler(GET_SAMPLE_OBSERVATION_CATEGORY, json)
}

export function fetchCategoryForSampleObservation(observation) {
    return function (dispatch) {
        dispatch(requestCategoryForSampleObservation());
        return post({url: 'try', body: observation})
            .then(json => dispatch(receiveCategoryForSampleObservation(json)))
            .catch(function(error){
                console.log('Error in fetchCategoryForSampleObservation');
                console.log(error);
                if(error.response){
                    return error.response.json()
                        .then(json => dispatch(handleCategoryForSampleObservationErrors(json)));
                }
                return dispatch(handleCategoryForSampleObservationErrors({}))
            });
    }
}