import {GET_PARAMETERS} from '../actions.jsx';

const initialState = {
    data: [],
    isFetching: false,
    errors: []
};

export default function parameters(state = initialState, action){
    switch (action.type) {
        case GET_PARAMETERS:
            if (action.status === undefined){
                // Request
                return {data: state.data, isFetching: true, errors: []}
            } else if (action.status == 'success') {
                // Response received
                return {data: action.response, isFetching: false, errors: []};
            }
            // Error received
            return {data: state.data, isFetching: false, errors: action.errors};
        default:
            return state;
    }
};
