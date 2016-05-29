var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Form = ReactBootstrap.Form;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var InputGroup = ReactBootstrap.InputGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var Button = ReactBootstrap.Button;
var HelpBlock = ReactBootstrap.HelpBlock;

var AuthStore = require('../stores/auth-store.jsx');
var Actions = require('../actions.jsx');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction(event, message){
        if(event === 'signupFailed'){
            this.setState({error: message})
        }
    },
    getInitialState() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: ''
        };
    },
    changeInput(field){
        var changedState = {};
        changedState[field] =  ReactDOM.findDOMNode(this.refs[field]).value;
        this.setState(changedState)
    },
    handleFirstNameChange(){
        this.changeInput('firstName')
    },
    handleLastNameChange(){
        this.changeInput('lastName');
    },
    handleEmailChange(){
        this.changeInput('email');
    },
    handlePasswordChange(){
        this.changeInput('password');
    },
    signup(event){
        event.preventDefault();
        Actions.Signup(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password)
    },
    render: function () {
        var extraStyle = {'paddingTop': '20px'};
        return (
            <Form horizontal style={extraStyle}>
                <FormGroup controlId="formControlsFirstEmail">
                    <Col componentClass={ControlLabel} sm={3}>
                        First Name
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            type="text"
                            value={this.state.firstName}
                            placeholder="Enter first name"
                            onChange={this.handleFirstNameChange}
                            ref="firstName"/>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsLastEmail">
                    <Col componentClass={ControlLabel} sm={3}>
                        Last Name
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            type="text"
                            value={this.state.lastName}
                            placeholder="Enter last name"
                            onChange={this.handleLastNameChange}
                            ref="lastName"/>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsEmail">
                    <Col componentClass={ControlLabel} sm={3}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl
                                type="email"
                                value={this.state.email}
                                placeholder="Enter email"
                                onChange={this.handleEmailChange}
                                addonBefore="@"
                                ref="email"/>
                        </InputGroup>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsPassword">
                    <Col componentClass={ControlLabel} sm={3}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="Enter password"
                            onChange={this.handlePasswordChange}
                            ref="password"/>
                        <FormControl.Feedback />
                        {this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type="submit"
                                ref="submitButton"
                                onClick={this.signup}>Signup</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
});