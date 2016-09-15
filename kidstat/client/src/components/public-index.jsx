import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import SampleObservation from './obsevations/sample-widget.jsx'

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