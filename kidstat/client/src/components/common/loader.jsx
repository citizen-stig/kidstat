import React from 'react';


let Loader = ({active}) => {
    const spinnerStyle = {'fontSize': '20em'};
        return <div className={active ? '' : 'hidden'} id="loading">
            <i id="spinner"
               className="fa fa-refresh fa-spin"
               style={spinnerStyle}/>
            <span className="sr-only">Loading...</span>
        </div>
};

Loader.propTypes = {
    active: React.PropTypes.bool,
};

export default Loader