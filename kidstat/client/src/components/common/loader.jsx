import {connect} from 'react-redux'


let Loader = ({active}) => {
    const spinnerStyle = {'fontSize': '20em'};
        return <div className={active ? '' : 'hidden'} id="loading">
            <i id="spinner"
               className="fa fa-refresh fa-spin"
               style={spinnerStyle}/>
            <span className="sr-only">Loading...</span>
        </div>
};


const mapStateToProps = (state) => {
    return {
        active: (state.sampleObservation.isFetching || state.parameters.isFetching )
    }
};

Loader = connect(mapStateToProps)(Loader);
export default Loader