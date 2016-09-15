import {GET_PARAMETERS} from '../actions.jsx';


export default function parameters(state = [], action){
    switch (action.type) {
        case GET_PARAMETERS:
            if (action.status === undefined){
                // Make request

            } else if (action.status == 'success') {
                return action.parameters;
            } else {
                return state
            }
            // return [
            //     {
            //         'id': 1,
            //         'name': 'weight',
            //         'unit': 'kg',
            //         'description': 'Sample description'
            //     },
            //     {
            //         'id': 2,
            //         'name': 'height',
            //         'unit': 'cm',
            //         'description': 'This is looong'
            //     }
            // ];
        default:
            return state;
    }
};
