import {GET_SAMPLE_OBSERVATION_CATEGORY} from '../actions.jsx';

const initialState = {
    category: null,
    isFetching: false,
    errors: []
};

export default function sampleObservation(state = initialState, action) {
    switch (action.type) {
        case GET_SAMPLE_OBSERVATION_CATEGORY:
            if (action.status === undefined) {
                // Request
                return {
                    category: state.category,
                    isFetching: true,
                    errors: []
                }
            } else if (action.status == 'success') {
                // Response Received
                return {category: action.response.category,
                    isFetching: false,
                    errors: []}
            }
            // Error
            return {
                data: state.category,
                isFetching: false,
                errors: action.errors};
        default:
            return state;
    }
}