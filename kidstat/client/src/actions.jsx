export const GET_PARAMETERS = 'GET_PARAMETERS';
export const GET_SAMPLE_OBSERVATION_CATEGORY = 'GET_SAMPLE_OBSERVATION_CATEGORY';


export function getSampleObservation(observation) {
    console.log('getSampleObservationAction');
    return {type: GET_SAMPLE_OBSERVATION_CATEGORY, observation}
}

export function getParameters(){
    return {type: GET_PARAMETERS};
}