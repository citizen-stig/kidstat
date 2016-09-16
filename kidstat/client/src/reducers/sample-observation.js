import {
    GET_SAMPLE_OBSERVATION_CATEGORY,
    CHANGE_SAMPLE_OBSERVATION} from '../actions.jsx';

const initialState = {
    data: {
        category: '',
        gender: 'male',
        birthday: '',
        timestamp: new Date().toISOString().split("T")[0],
        parameter: '',
        value: '',
    },
    isFetching: false,
    errors: []
};

export default function sampleObservation(state = initialState, action) {
    switch (action.type) {
        case GET_SAMPLE_OBSERVATION_CATEGORY:
            if (action.status === undefined) {
                // Request
                return {
                    data: state.data,
                    isFetching: true,
                    errors: []
                }
            } else if (action.status == 'success') {
                // Response Received
                let data = Object.assign(
                    {},
                    state.data,
                    {category: action.response.category});
                return {data : data,
                    isFetching: false,
                    errors: []}
            }
            // Error
            return {
                data: state.data,
                isFetching: false,
                errors: action.errors};
        case CHANGE_SAMPLE_OBSERVATION:
            let newObservation = Object.assign({}, state.data, action.data);
            return Object.assign({}, state, {data: newObservation});
        default:
            return state;
    }
}