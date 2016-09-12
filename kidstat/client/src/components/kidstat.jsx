import React, {Component, PropTypes} from 'react';
import Reflux from 'reflux';

import Header from './common/header.jsx';
import PublicIndex from './public-index.jsx';
import Dashboard from './dashboard.jsx';
import Loader from './common/loading.jsx';


export default class KidStat extends Component {

    constructor() {
        super();
        this.state = {authorized: false, loaded: false}
    }

    render() {
        return (<div>
            <Header/>
            <div className="container">
                {this.state.authenticated ? <Dashboard/> : <PublicIndex/>}
            </div>
            <Loader ref="loader"/>
        </div>)
    }
}