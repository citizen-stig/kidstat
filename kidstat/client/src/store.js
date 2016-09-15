import {combineReducers} from 'redux';

import parameters from './reducers/parameters.js';
import sampleObservation from './reducers/sample-observation.js';


// var SomeState = {
//     'sampleObservation': {
//          'category': 'Average',
//          'isFetching: false,
//          errors:
//      },
//     'parameters': {
//          'isFetching': false
//          'data': []
//      },
//     'isFetching': false,
// };


const kidstatReducer = combineReducers({parameters, sampleObservation});
export default kidstatReducer;
