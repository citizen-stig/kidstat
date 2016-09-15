import React, {Component, PropTypes} from 'react';
import {Alert, Col} from 'react-bootstrap';
import SampleObservationForm from './sample-form.jsx';

import CategoryAlertContainer from '../../containers/category-alert.jsx';

export default class SampleObservationWidget extends Component {

    constructor() {
        super();
        this.state = {errors: null}
    }

    renderErrors() {
        return Object.keys(this.state.errors).map(function (field) {
            return this.state.errors[field].map(function (error) {
                return <Alert bsStyle="error">
                    <strong>{field}</strong>: {error}
                </Alert>
            }.bind(this))
        }.bind(this))
    }
    render() {
        return <div>
            <h2>Try Now.</h2>
            <p>Check category right now:</p>
            <Col xs={12}>
                {this.state.errors ? this.renderErrors() : ''}
                <SampleObservationForm/>
                <CategoryAlertContainer/>
            </Col>
        </div>
    }
}