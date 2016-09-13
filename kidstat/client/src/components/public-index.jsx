import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';

import Actions from '../actions.jsx';

import SampleObservation from './obsevations/sample-widget.jsx'
import LoginForm from './auth/login-form.jsx';
import SignupForm from './auth/signup-form.jsx';

export default class KidStat extends Component {
    responseFacebook(response){
        Actions.FacebookLogin(response['accessToken']);
    }
    render() {
        return <Grid>
            <Row className="show-grid">
                <h1 className="text-center">Welcome to the Kidstat!</h1>
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
}