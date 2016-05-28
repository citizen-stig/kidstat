var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Form = ReactBootstrap.Form;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var InputGroup = ReactBootstrap.InputGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var Button = ReactBootstrap.Button;

var Actions = require('../actions.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {email: '', password: ''};
    },
    login(event){
        event.preventDefault();
        Actions.Login(this.state.email, this.state.password);
    },
    handleEmailChange(){
        this.setState({email: ReactDOM.findDOMNode(this.refs.email).value})
    },
    handlePasswordChange(){
        this.setState(
            {password: ReactDOM.findDOMNode(this.refs.password).value})
    },
    render: function () {
        return (
            <Form horizontal>
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
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type="submit"
                                onClick={this.login}>Login</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
});