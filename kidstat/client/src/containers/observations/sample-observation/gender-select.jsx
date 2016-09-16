import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.jsx'
import GenderSelect from '../../../components/obsevations/gender-select.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        value: state.sampleObservation.data.gender,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({gender: event.target.value}))
        },
    }
};

let GenderSelectContainer = connect(mapStateToProps, mapDispatchToProps)(GenderSelect);
export default GenderSelectContainer