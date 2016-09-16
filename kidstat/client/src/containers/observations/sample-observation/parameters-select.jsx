import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.jsx'
import ParameterSelect from '../../../components/obsevations/parameters-select';

const mapStateToProps = (state, ownProps) => {
    return {
        parameters: state.parameters.data,
        value: state.sampleObservation.data.parameter,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({parameter: event.target.value}))
        },
    }
};

let ParameterSelectContainer = connect(mapStateToProps, mapDispatchToProps)(ParameterSelect);
export default ParameterSelectContainer;