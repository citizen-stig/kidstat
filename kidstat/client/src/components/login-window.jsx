var React = require('react');
var Reflux = require('reflux');
var AuthStore = require('../stores/auth-store');
var LoginForm = require('./login-form');
var ModalWindow = require('./modal');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "authenticated")
    ],
    authenticated(event){
        if (event == 'authenticated'){this.refs.modal.close();}
    },
    open: function(){
        this.refs.modal.open()
    },
    render: function () {
        return <ModalWindow ref="modal" title="Login">
            <LoginForm/>
            </ModalWindow>
    }
});