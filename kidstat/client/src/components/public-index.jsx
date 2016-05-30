var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var FacebookLogin = require('react-facebook-login');
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

var Actions = require('../actions.jsx');
var LoginForm = require('./login-form.jsx');
var SignupForm = require('./signup-form.jsx');

module.exports = React.createClass({
    responseFacebook: function (response) {
        Actions.FacebookLogin(response['accessToken']);
    },
    render: function () {
        return <Grid>
            <Row className="show-grid">
                <Col xs={12} md={7}>
                    <div className="text-center">
                        <h1>Welcome to the Kidstat!</h1>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Baby2.gif"/>
                        <p>This a web site, where you can track how your baby
                            grows!</p>
                    </div>
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