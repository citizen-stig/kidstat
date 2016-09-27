import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.js'
import ValueInput from '../../../components/observations/inputs/value.jsx';

const mapStateToProps = (state) => {
    let value = state.sampleObservation.data.value;
    return {
        value: value,
        isValid: !isNaN(value) && (value > 0)
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


const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({value: clearDecimalInput(event.target.value)}))
        },
    }
};

let ValueInputContainer = connect(mapStateToProps, mapDispatchToProps)(ValueInput);
export default ValueInputContainer