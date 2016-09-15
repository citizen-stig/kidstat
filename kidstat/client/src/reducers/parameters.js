import {GET_PARAMETERS} from '../actions.jsx';


export default function parameters(state = [], action){
    switch (action.type) {
        case GET_PARAMETERS:
            return [
                {
                    'id': 1,
                    'name': 'weight',
                    'unit': 'kg',
                    'description': 'Sample description'
                },
                {
                    'id': 2,
                    'name': 'height',
                    'unit': 'cm',
                    'description': 'This is looong'
                }
            ];
        default:
            return state;
    }
};
