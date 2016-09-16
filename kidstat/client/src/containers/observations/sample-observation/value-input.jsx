import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.jsx'
import ValueInput from '../../../components/obsevations/value-input.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.sampleObservation.data.value,
    }
};

var clearDecimalInput = function (value) {
    var parts = value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').split('.');
    var newValue = parts[0];
    if (parts.length > 1) {
        newValue += "." + parts.slice(1).join("");
    }
    return newValue;
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({value: clearDecimalInput(event.target.value)}))
        },
    }
};

let ValueInputContainer = connect(mapStateToProps, mapDispatchToProps)(ValueInput);
export default ValueInputContainer