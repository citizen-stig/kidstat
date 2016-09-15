import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import SampleObservationWidget from './obsevations/sample-widget.jsx'


const PublicIndex = () => {
    return <Grid>
        <Row className="show-grid">
            <h1 className="text-center">Welcome to the KidStat!</h1>
            <Col xs={12} md={7}>
                <SampleObservationWidget/>
            </Col>
        </Row>
    </Grid>
};

export default PublicIndex;
