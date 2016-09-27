import {connect} from 'react-redux'

import {changeSampleObservation} from '../../../actions.js'
import GenderSelect from '../../../components/kids/inputs/gender.jsx';

const mapStateToProps = (state) => {
    return {
        value: state.sampleObservation.data.gender,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (event) => {
            dispatch(changeSampleObservation({gender: event.target.value}))
        },
    }
};

let GenderSelectContainer = connect(mapStateToProps, mapDispatchToProps)(GenderSelect);
export default GenderSelectContainer