var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var FacebookLogin = require('react-facebook-login');
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

var Actions = require('../actions.jsx');
var LoginForm = require('./auth/login-form.jsx');
var SignupForm = require('./auth/signup-form.jsx');
var SampleObservation = require('./obsevations/sample-widget.jsx');


module.exports = React.createClass({
    responseFacebook: function (response) {
        Actions.FacebookLogin(response['accessToken']);
    },
    render: function () {
        return <Grid>
            <Row className="show-grid">
                <h1 className="text-center" >Welcome to the Kidstat!</h1>
                <Col xs={12} md={7}>
                    <SampleObservation/>
                </Col>
                <Col xs={12} md={5}>
                    <h2>Login</h2>
                    <Tabs defaultActiveKey="login" id="login-signup-tabs">
                        <Tab eventKey="login" title="Login">
                            <LoginForm/>
                        </Tab>
                        <Tab eventKey="signup" title="Signup">
                            <SignupForm/>
                        </Tab>
                    </Tabs>
                    <hr/>
                    <FacebookLogin
                        appId="288802541458761"
                        autoLoad={false}
                        callback={this.responseFacebook}
                        textButton="Facebook"
                        cssClass="btn btn-primary"
                        icon="fa-facebook"/>
                </Col>
            </Row>
        </Grid>
    }
});