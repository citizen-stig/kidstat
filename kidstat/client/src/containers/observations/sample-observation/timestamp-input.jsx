import {connect} from 'react-redux';

import {changeSampleObservation} from '../../../actions.jsx'
import TimestampInput
    from '../../../components/observations/inputs/timestamp.jsx';

const mapStateToProps = (state) => {
    return {
        value: state.sampleObservation.data.timestamp,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({timestamp: event.target.value}))
        },
    }
};

let TimestampInputContainer = connect(mapStateToProps, mapDispatchToProps)(TimestampInput);
export default TimestampInputContainer;