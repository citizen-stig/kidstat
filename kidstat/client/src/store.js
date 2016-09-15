import {combineReducers} from 'redux';

import parameters from './reducers/parameters.js';
import sampleObservation from './reducers/sample-observation.js';


// var defaultState = {
//     'sampleObservation': {},
//     'parameters': [],
//     'isFetching': false,
// };


const kidstatReducer = combineReducers({parameters, sampleObservation});
export default kidstatReducer;
