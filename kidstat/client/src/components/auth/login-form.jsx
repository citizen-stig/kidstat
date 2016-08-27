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

var AuthStore = require('../../stores/auth-store.jsx');
var Actions = require('../../actions.jsx');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function(event, message){
        if(event === 'authenticationFailed'){
            this.setState({error: message})
        }
    },
    getInitialState: function() {
        return {email: '', password: '', error: ''};
    },
    login: function(event){
        event.preventDefault();
        this.setState({error: ''});
        Actions.Login(this.state.email, this.state.password);
    },
    handleEmailChange: function(){
        this.setState({email: ReactDOM.findDOMNode(this.refs.email).value})
    },
    handlePasswordChange: function(){
        this.setState(
            {password: ReactDOM.findDOMNode(this.refs.password).value})
    },

    render: function () {
        var extraStyle = {'paddingTop': '20px'};
        return (
            <Form horizontal style={extraStyle}>
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
                                ref="email"/>
                        </InputGroup>
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
                        {this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type="submit"
                                ref="submitButton"
                                onClick={this.login}>Login</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
});