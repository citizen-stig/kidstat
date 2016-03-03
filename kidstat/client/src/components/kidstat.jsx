var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Button = ReactBootstrap.Button;

var AuthStore = require('../stores/auth-store');
var Header = require('./header');
var KidsList = require('./kids-list');
var PublicIndex = require('./public-index');
var Actions = require('../actions');
var Loader = require('./loading.jsx');
var AddNewKid = require('./add-new-kid');

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
    openAddNewKidWindow: function(){
        this.refs.addNewKidWindow.open()
    },
    render: function () {

        var body;
        if (this.state.authenticated) {
            body = <div>
                <div className="row">
                    <div className="pull-right">
                        <Button onClick={this.openAddNewKidWindow} bsStyle="primary">Add new kid</Button>
                    </div>
                </div>
                <div>
                    <KidsList/>
                </div>
                <AddNewKid ref="addNewKidWindow"/>
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