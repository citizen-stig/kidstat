var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;

var Actions = require('../actions');

module.exports = React.createClass({
    getInitialState() {
        return {email: '', password: ''};
    },
    login(event){
        event.preventDefault();
        console.log("We need to trigger Login action!");
        Actions.Login(this.state.email, this.state.password);
    },
    handleEmailChange(){
        this.setState({email: this.refs.email.getValue()})
    },
    handlePasswordChange(){
        this.setState({password: this.refs.password.getValue()})
    },
    render: function() {
    return (
    <form className="form-horizontal">
        <Input type="email" label="Email Address"  placeholder="Enter email"
               value={this.state.email}
               onChange={this.handleEmailChange}
               hasFeedback={true}
               addonBefore="@"
               ref="email"
        />
        <Input type="password" label="Password"
               value={this.state.password}
               onChange={this.handlePasswordChange}
               ref="password"
        />
        <ButtonInput type="submit" onClick={this.login} value="Login"/>
    </form>
    )
  }
});