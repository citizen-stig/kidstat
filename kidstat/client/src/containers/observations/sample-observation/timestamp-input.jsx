import {connect} from 'react-redux';

import {changeSampleObservation} from '../../../actions.jsx'
import TimestampInput from '../../../components/obsevations/timestamp-input.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.sampleObservation.data.timestamp,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({timestamp: event.target.value}))
        },
    }
};

let TimestampInputContainer = connect(mapStateToProps, mapDispatchToProps)(TimestampInput);
export default TimestampInputContainer;