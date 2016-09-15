import React, {Component, PropTypes} from 'react';

import Header from './common/header.jsx';
import PublicIndex from './public-index.jsx';
import Loader from './common/loader.jsx';

const KidStat = () => {
    return <div>
        <Header/>
        <div className="container">
            <PublicIndex/>
        </div>
        <Loader ref="loader"/>
    </div>
};

export default KidStat