import {combineReducers} from 'redux';

import parameters from './reducers/parameters.js';
import sampleObservation from './reducers/sample-observation.js';
import {changeSampleObservation} from './actions.js'

// var SomeState = {
//     'sampleObservation': {
//          data: {
//              gender: 'male'
//              timestamp: ...
//             ......
//              'category': 'Average'},
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

const rootReducer = (state = {}, action) =>{
    let newState = kidstatReducer(state, action);
    if(!(newState.sampleObservation.data.parameter) && newState.parameters.data.length > 0){
        // Set first parameter as selected value for sampleObservation
        let newObservation = {parameter: newState.parameters.data[0].name};
        newState.sampleObservation = sampleObservation(
            newState.sampleObservation,
            changeSampleObservation(newObservation));
    }
    return newState
};
export default rootReducer;
