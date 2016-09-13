import React, {Component, PropTypes} from 'react';
import {
    Form,
    Col,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from 'react-bootstrap';


export default class SampleObservationForm extends Component {
    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.getValueValidationState = this.getValueValidationState.bind(this);
        this.handleTimestampChange = this.handleTimestampChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.getFormValidationState = this.getFormValidationState.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            gender: 'male',
            birthday: '',
            timestamp: new Date().toISOString().split("T")[0],
            parameter: 'height',
            value: ''
        }
    }

    getFormValidationState() {
        return (this.state.birthday && this.state.value && (this.state.birthday < this.state.timestamp))
    }

    handleValueChange(event) {
        this.setState({value: parseFloat(event.target.value)});
    }

    getValueValidationState() {
        if (this.state.value !== '' && !isNaN(this.state.value)) {
            if (this.state.value > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } else {
            return 'error'
        }
    }

    handleTimestampChange(event) {
        this.setState({timestamp: event.target.value})
    }

    handleBirthdayChange(event) {
        this.setState({birthday: event.target.value})
    }

    handleGenderChange(event) {
        this.setState({gender: event.target.value})
    }

    onFormSubmit(event) {
        if (this.getFormValidationState()) {
            this.submit()
        }
        event.preventDefault();
    }

    submit() {
        this.props.submitAction(this.state);
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={3}>
                        Gender
                    </Col>
                    <Col sm={9}>
                        <FormControl className="min-width-95p"
                                     componentClass="select"
                                     value={this.state.gender}
                                     onChange={this.handleGenderChange}>
                            <option value="male">Boy</option>
                            <option value="female">Girl</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="birthdayControl">
                    <Col componentClass={ControlLabel} sm={3}>
                        Birthday
                    </Col>
                    <Col sm={9}>
                        <FormControl className="min-width-95p"
                                     onChange={this.handleBirthdayChange}
                                     value={this.state.birthday}
                                     type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="timestampControl">
                    <Col componentClass={ControlLabel} sm={3}>
                        Timestamp
                    </Col>
                    <Col sm={9}>
                        <FormControl className="min-width-95p"
                                     value={this.state.timestamp}
                                     onChange={this.handleTimestampChange}
                                     type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={3}>
                        Parameter
                    </Col>
                    <Col sm={9}>
                        <FormControl className="min-width-95p"
                                     componentClass="select">
                            <option value="height">Height</option>
                            <option value="weight">Weight</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup validationState={this.getValueValidationState()}
                           controlId="valueControl">
                    <Col componentClass={ControlLabel} sm={3}>
                        Value
                    </Col>
                    <Col sm={9}>
                        <FormControl value={this.state.value}
                                     onChange={this.handleValueChange}
                                     pattern="[0-9]*"
                                     inputMode="numeric"
                                     step="0.01"
                                     min="0"
                                     type="number"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type="button"
                                onClick={this.submit}
                                disabled={!this.getFormValidationState()}
                                ref="submitButton">Check</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

SampleObservationForm.propTypes = {
    submitAction: PropTypes.func
};

SampleObservationForm.defaultProps = {
    submitAction: function (observation) {
        console.log(observation)
    }
};