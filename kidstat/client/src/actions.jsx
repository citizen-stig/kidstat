import 'whatwg-fetch';

const rootUrl = '/api/v1/';


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

export function fetchParameters() {
    return function (dispatch) {

        dispatch(requestParameters());

        return fetch(rootUrl + 'parameters')
            .then(response => response.json())
            .then(json =>
                dispatch(receiveParameters(json))
            );
    }
}


// Sample Observations
export const GET_SAMPLE_OBSERVATION_CATEGORY = 'GET_SAMPLE_OBSERVATION_CATEGORY';

export function requestCategoryForSampleObservation(observation) {
    return {type: GET_SAMPLE_OBSERVATION_CATEGORY, observation}
}

export function receiveCategoryForSampleObservation(json) {
    return {
        type: GET_SAMPLE_OBSERVATION_CATEGORY,
        status: 'success',
        response: json
    }
}

export function fetchCategoryForSampleObservation(observation) {

    return function (dispatch) {

        dispatch(requestCategoryForSampleObservation(observation));

        return fetch(rootUrl + 'try', {
            method: 'post',
            body: JSON.stringify(observation),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(json =>
                dispatch(receiveCategoryForSampleObservation(json)));
    }
}