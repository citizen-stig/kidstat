import React, {Component, PropTypes} from 'react';

import Header from './common/header.jsx';
import PublicIndex from './public-index.jsx';
import Loader from '../containers/common/loader.js';

const KidStat = () => {
    return <div>
        <Header/>
        <div className="container">
            <PublicIndex/>
        </div>
        <Loader/>
    </div>
};

export default KidStat