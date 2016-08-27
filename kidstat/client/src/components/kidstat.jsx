var React = require('react');
var Reflux = require('reflux');

var AuthStore = require('../stores/auth-store.jsx');
var Header = require('./common/header.jsx');
var PublicIndex = require('./public-index.jsx');
var Actions = require('../actions.jsx');
var Loader = require('./common/loading.jsx');
var Dashboard = require('./dashboard.jsx');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function (event) {
        if (event == 'authenticated') {
            this.setState({authenticated: true});
        }
        else if (event == 'logout') {
            this.setState({authenticated: false});
        }
    },
    componentWillMount: function () {
        Actions.CheckAuthorization();
    },
    getInitialState: function () {
        return {authorized: false, loaded: false}
    },
    render: function () {
        return (<div>
            <Header/>
            <div className="container">
                {this.state.authenticated ? <Dashboard/> : <PublicIndex/>}
            </div>
            <Loader ref="loader"/>
        </div>)
    }
});