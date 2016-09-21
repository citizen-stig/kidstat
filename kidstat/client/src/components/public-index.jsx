import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import SampleObservationWidget from './observations/sample-widget.jsx'


const PublicIndex = () => {
    return <Grid>
        <Row className="show-grid">
            <h1 className="text-center">KidStat</h1>
            <Col xs={12} md={7}>
                <SampleObservationWidget/>
            </Col>
        </Row>
    </Grid>
};

export default PublicIndex;
