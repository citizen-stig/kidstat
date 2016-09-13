import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
// import FacebookLogin from 'react-facebook-login';

// import Actions from '../actions.jsx';

import SampleObservation from './obsevations/sample-widget.jsx'
// import LoginForm from './auth/login-form.jsx';
// import SignupForm from './auth/signup-form.jsx';

export default class KidStat extends Component {
    render() {
        return <Grid>
            <Row className="show-grid">
                <h1 className="text-center">Welcome to the KidStat!</h1>
                <Col xs={12} md={7}>
                    <SampleObservation/>
                </Col>
            </Row>
        </Grid>

    }
}