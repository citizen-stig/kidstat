import React, {Component, PropTypes} from 'react';
import {Alert, Col} from 'react-bootstrap';

import Actions from '../../actions.jsx';
import ObservationStore from '../../stores/observations-store.jsx';

import SampleObservationForm from './sample-form.jsx';
import AlertCategory from './category-alert.jsx';


export default class SampleObservationWidget extends Component {

    constructor() {
        super();
        this.submitObservationSample = this.submitObservationSample.bind(this);
        this.handleObservationStore = this.handleObservationStore.bind(this);
        this.state = {category: null, errors: null}
    }

    componentDidMount() {
        ObservationStore.listen(this.handleObservationStore)
    }

    handleObservationStore(event, data) {
        if (event == ObservationStore.events.sampleCategoryReceived) {
            this.setState({category: data})
        } else if (event == ObservationStore.events.sampleCategoryError) {
            this.setState({errors: data})
        }
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

    submitObservationSample(observation) {
        this.setState({errors: null});
        Actions.requestSampleObservation(observation);
    }

    render() {
        return <div>
            <h2>Try Now.</h2>
            <p>Check category right now:</p>
            <Col xs={12}>
                {this.state.errors ? this.renderErrors() : ''}
                <SampleObservationForm
                    submitAction={this.submitObservationSample}/>
                {this.state.category ? <AlertCategory category={this.state.category}/> : ''}
            </Col>
        </div>
    }
}