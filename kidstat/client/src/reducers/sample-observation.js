import {
    GET_SAMPLE_OBSERVATION_CATEGORY,
    CHANGE_SAMPLE_OBSERVATION
} from '../actions.js';

const initialState = {
    data: {
        category: '',
        gender: 'male',
        birthday: '',
        timestamp: new Date().toISOString().split("T")[0],
        parameter: '',
        value: '',
        isValid: false
    },
    isFetching: false,
    errors: []
};

export default function sampleObservation(state = initialState, action) {
    switch (action.type) {
        case GET_SAMPLE_OBSERVATION_CATEGORY:
            if (action.status === undefined) {
                // Request
                let data = Object.assign(
                    {},
                    state.data,
                    {category: ''});
                return {
                    data: data,
                    isFetching: true,
                    errors: []
                }
            } else if (action.status === 'success') {
                // Response Received
                let data = Object.assign(
                    {},
                    state.data,
                    {category: action.response.category});
                return {
                    data: data,
                    isFetching: false,
                    errors: []
                }
            } else if (action.status === 'error') {
                // Error
                return {
                    data: state.data,
                    isFetching: false,
                    errors: action.errors
                }
            }
            return state;
        case CHANGE_SAMPLE_OBSERVATION:
            let newObservation = Object.assign({}, state.data, action.data);
            newObservation.isValid = !!(newObservation.gender &&
                newObservation.birthday && newObservation.timestamp &&
                newObservation.value &&
                (newObservation.birthday <= newObservation.timestamp));
            return Object.assign({}, state, {data: newObservation});
        default:
            return state;
    }
}