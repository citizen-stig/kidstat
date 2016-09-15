import {GET_SAMPLE_OBSERVATION_CATEGORY} from '../actions.jsx';

export default function sampleObservation(state = {}, action) {
    switch (action.type) {
        case GET_SAMPLE_OBSERVATION_CATEGORY:
            console.log("Getting sample observation in reducer");
            if (action.observation.value < 50) {
                return {category: 'Low'};
            } else if (action.observation.value >= 50 && action.observation.value < 100) {
                return {category: 'Average'}
            } else {
                return {category: 'High'}
            }
        default:
            return state;
    }
}