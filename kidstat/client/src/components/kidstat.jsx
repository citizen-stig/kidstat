var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var AuthStore = require('../stores/auth-store');
var Header = require('./header');
var KidsList = require('./kids-list');
var PublicIndex = require('./public-index');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function(event){
        if (event == 'authenticated'){ this.setState({authenticated: true}); }
        else if (event == 'logout') { this.setState({authenticated: false}); }
    },
    getInitialState: function () {
        return {authorized: false}
    },
    render: function () {

        var body;
        if (this.state.authenticated){
            body = <KidsList/>
        } else {
            body = <PublicIndex/>
        }
        return (<div>
            <Header/>
            {body}
        </div>)
    }
});