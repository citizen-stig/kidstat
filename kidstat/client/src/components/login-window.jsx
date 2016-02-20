var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var AuthStore = require('../stores/auth-store');
var LoginForm = require('./login-form');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore,"authenticated")
    ],
    authenticated(event){
        console.log("Kinda authenticated");
        if (event == 'authenticated'){this.close();}
    },
    getInitialState() {return {showModal: false};},
    close() {this.setState({showModal: false});},
    open() {this.setState({showModal: true});},
    render: function () {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                </Modal>
            </div>)
    }
});