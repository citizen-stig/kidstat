import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.js'
import ParameterSelect from '../../../components/observations/inputs/parametet';

const mapStateToProps = (state) => {
    return {
        parameters: state.parameters.data,
        value: state.sampleObservation.data.parameter,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({parameter: event.target.value}))
        },
    }
};

let ParameterSelectContainer = connect(mapStateToProps, mapDispatchToProps)(ParameterSelect);
export default ParameterSelectContainer;