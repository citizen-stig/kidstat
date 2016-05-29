var React = require('react');
var Reflux = require('reflux');

var AuthStore = require('../stores/auth-store');
var Header = require('./header');
var KidsList = require('./kids-list');
var PublicIndex = require('./public-index');
var Actions = require('../actions');
var Loader = require('./loading.jsx');

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

        var body;
        if (this.state.authenticated) {
            body = <div>
                <div className="row">
                </div>
                <div>
                    <KidsList/>
                </div>
                <p>Under construction</p>
            </div>
        } else {
            body = <PublicIndex/>
        }
        return (<div>
            <Header/>
            <div className="container">
                {body}
            </div>
            <Loader ref="loader"/>
        </div>)
    }
});