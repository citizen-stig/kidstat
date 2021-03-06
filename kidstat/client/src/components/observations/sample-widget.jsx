import React from 'react';
import {Col} from 'react-bootstrap';

import SampleObservationForm from '../../containers/observations/sample-form.js';
import CategoryAlertContainer
    from '../../containers/observations/sample-observation/category-alert.jsx';

let SampleObservationWidget = () => {
    return <div>
        <h2>Try Now</h2>
        <p>Check category right now:</p>
        <Col xs={12}>
            <SampleObservationForm/>
            <CategoryAlertContainer/>
        </Col>
    </div>
};

export default SampleObservationWidget;