import {connect} from 'react-redux'

import Loader from '../../components/common/loader.jsx'

const mapStateToProps = (state) => {
    return {
        active: (state.sampleObservation.isFetching || state.parameters.isFetching )
    }
};

export default connect(mapStateToProps)(Loader)