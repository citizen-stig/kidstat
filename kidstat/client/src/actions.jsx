import 'whatwg-fetch';
export const GET_PARAMETERS = 'GET_PARAMETERS';
export const GET_SAMPLE_OBSERVATION_CATEGORY = 'GET_SAMPLE_OBSERVATION_CATEGORY';


export function requestCategoryForSampleObservation(observation) {
    return {type: GET_SAMPLE_OBSERVATION_CATEGORY, observation}
}

export function receiveCategoryForSampleObservation(json){
    return {
        type: GET_SAMPLE_OBSERVATION_CATEGORY,
        status: 'success',
        data: json
    }
}

// Parameters
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


let rootUrl = '/api/v1/';

export function fetchParameters() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestParameters());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(rootUrl + 'parameters')
      .then(response => response.json())
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveParameters(json))
      );

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}