import {connect} from 'react-redux'

import ErrorsList from '../../components/obsevations/errors-list.jsx'

const mapStateToProps = (state) => {
    return {
        messages: [...state.sampleObservation.errors, ...state.parameters.errors]
    }
};

let ErrorsListContainer = connect(mapStateToProps)(ErrorsList);
export default ErrorsListContainer
