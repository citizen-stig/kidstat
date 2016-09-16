import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.jsx'
import BirthdayInput from '../../../components/obsevations/birthday-input.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.sampleObservation.data.birthday,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({birthday: event.target.value}))
        },
    }
};

let BirthdayInputContainer = connect(mapStateToProps, mapDispatchToProps)(BirthdayInput);
export default BirthdayInputContainer;