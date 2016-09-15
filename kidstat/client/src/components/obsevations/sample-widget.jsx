import React, {Component, PropTypes} from 'react';
import {Alert, Col} from 'react-bootstrap';
import SampleObservationForm from './sample-form.jsx';
import CategoryAlert from './category-alert.jsx';


export default class SampleObservationWidget extends Component {

    constructor() {
        super();
        // this.submitObservationSample = this.submitObservationSample.bind(this);
        // this.handleObservationStore = this.handleObservationStore.bind(this);
        this.state = {category: null, errors: null}
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

    // submitObservationSample(observation) {
    //     this.setState({errors: null});
    //     console.log('submit observation somewhere');
    //     console.log(observation);
    //     getSampleObservation(observation);
    //     Actions.requestSampleObservation(observation);
    // }

    render() {
        return <div>
            <h2>Try Now.</h2>
            <p>Check category right now:</p>
            <Col xs={12}>
                {this.state.errors ? this.renderErrors() : ''}
                <SampleObservationForm/>
                <CategoryAlert/>
            </Col>
        </div>
    }
}