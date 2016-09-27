import {connect} from 'react-redux'

import SampleObservationForm from '../../components/observations/sample-form.jsx';

import {
    fetchCategoryForSampleObservation,
    fetchParameters
} from '../../actions.js'

const mapStateToProps = (state) => {
    let sampleObservation = state.sampleObservation.data;
    let observation = {
        gender: sampleObservation.gender,
        birthday: sampleObservation.birthday,
        timestamp: sampleObservation.timestamp,
        parameter: sampleObservation.parameter,
        value: sampleObservation.value
    };
    return {
        isValid: sampleObservation.isValid,
        observation: observation,
        errors: state.parameters.errors
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitAction: function (observation) {
            dispatch(fetchCategoryForSampleObservation(observation))
        },
        getParameters: function () {
            dispatch(fetchParameters())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleObservationForm);