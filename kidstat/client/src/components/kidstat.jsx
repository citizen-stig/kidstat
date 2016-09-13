import React, {Component, PropTypes} from 'react';
import Reflux from 'reflux';

import Actions from '../actions.jsx';
import AuthStore from '../stores/auth-store.jsx'

import Header from './common/header.jsx';
import PublicIndex from './public-index.jsx';
import Dashboard from './dashboard.jsx';
import Loader from './common/loading.jsx';


export default class KidStat extends Component {
    constructor() {
        super();
        this.handleAuthAction = this.handleAuthAction.bind(this);
        this.state = {authorized: false, loaded: false}
    }
    componentWillMount(){
        Actions.CheckAuthorization();
    }
    componentDidMount(){
        AuthStore.listen(this.handleAuthAction);
    }
    handleAuthAction(event) {
        if (event == 'authenticated') {
            this.setState({authenticated: true});
        }
        else if (event == 'logout') {
            this.setState({authenticated: false});
        }
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