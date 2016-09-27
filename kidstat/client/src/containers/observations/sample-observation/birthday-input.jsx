import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.js'
import BirthdayInput from '../../../components/kids/inputs/birthday.jsx';

const mapStateToProps = (state) => {
    let isValid = state.sampleObservation.data.birthday &&
        (state.sampleObservation.data.birthday <= state.sampleObservation.data.timestamp);
    return {
        value: state.sampleObservation.data.birthday,
        isValid: isValid
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({birthday: event.target.value}))
        },
    }
};

let BirthdayInputContainer = connect(mapStateToProps, mapDispatchToProps)(BirthdayInput);
export default BirthdayInputContainer;