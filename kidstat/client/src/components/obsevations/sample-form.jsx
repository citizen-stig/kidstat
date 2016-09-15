import React, {Component, PropTypes} from 'react';
import {
    Form,
    Col,
    FormGroup,
    FormControl,
    ButtonGroup,
    Button,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';


import {connect} from 'react-redux'

import {
    fetchCategoryForSampleObservation,
    fetchParameters
} from '../../actions.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        parameters: state.parameters.data,
        errors: state.parameters.errors
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitAction: function (observation) {
            dispatch(fetchCategoryForSampleObservation(observation))
        },
        getParameters: function () {
            dispatch(fetchParameters())
        }
    }
};

var clearDecimalInput = function (value) {
    var parts = value.replace(/[^0-9.,]/g, '').replace(/,/g, '.').split('.');
    var newValue = parts[0];
    if (parts.length > 1) {
        newValue += "." + parts.slice(1).join("");
    }
    return newValue;
};

class SampleObservationForm extends Component {
    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.getValueValidationState = this.getValueValidationState.bind(this);
        this.handleTimestampChange = this.handleTimestampChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
        this.getBirthdayValidationState = this.getBirthdayValidationState.bind(this);
        this.getBirthdayValidationStateName = this.getBirthdayValidationStateName.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.getFormValidationState = this.getFormValidationState.bind(this);
        this.getValueValidationStateName = this.getValueValidationStateName.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            gender: 'male',
            birthday: '',
            timestamp: new Date().toISOString().split("T")[0],
            parameter: 'height',
            value: '',
            errors: []
        }
    }

    componentDidMount() {
        this.props.getParameters();
    }

    getFormValidationState() {
        return (this.state.timestamp && this.getValueValidationState() && this.getBirthdayValidationState())
    }

    handleValueChange(event) {
        var newValue = clearDecimalInput(event.target.value);
        this.setState({value: newValue});
    }

    getValueValidationState() {
        return this.state.value !== '' && !isNaN(this.state.value) && this.state.value > 0
    }

    getValueValidationStateName() {
        if (this.getValueValidationState()) {
            return 'success';
        }
        return 'error';
    }

    handleTimestampChange(event) {
        this.setState({timestamp: event.target.value})
    }

    handleBirthdayChange(event) {
        this.setState({birthday: event.target.value})
    }

    getBirthdayValidationState() {
        return this.state.birthday && this.state.birthday < this.state.timestamp
    }

    getBirthdayValidationStateName() {
        if (this.state.birthday) {
            if (this.getBirthdayValidationState()) {
                return "success";
            }
            return "error";
        }
        return "warning"
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
        let observation = {
            gender: this.state.gender,
            birthday: this.state.birthday,
            timestamp: this.state.timestamp,
            parameter: this.state.parameter,
            value: parseFloat(this.state.value)
        };
        this.props.submitAction(observation);
    }

    renderParameterChoices() {
        return this.props.parameters.map(function (parameter) {
            return <option key={parameter.id}
                           value={parameter.name}>
                {parameter.name}, {parameter.unit}
            </option>
        })
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                <FormGroup controlId="formControlsSelect" className="required">
                    <Col componentClass={ControlLabel} xs={4}>
                        Gender
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     componentClass="select"
                                     value={this.state.gender}
                                     onChange={this.handleGenderChange}>
                            <option value="male">Boy</option>
                            <option value="female">Girl</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup controlId="birthdayControl" className="required"
                           validationState={this.getBirthdayValidationStateName()}>
                    <Col componentClass={ControlLabel} xs={4}>
                        Birthday
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     required={true}
                                     onChange={this.handleBirthdayChange}
                                     value={this.state.birthday}
                                     type="date"/>
                        {!this.getBirthdayValidationState() ?
                            <HelpBlock>Birthday should be less then a
                                timestamp</HelpBlock> : ''}
                    </Col>
                </FormGroup>
                <FormGroup controlId="timestampControl" className="required">
                    <Col componentClass={ControlLabel} xs={4}>
                        Timestamp
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     required={true}
                                     value={this.state.timestamp}
                                     onChange={this.handleTimestampChange}
                                     type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelect" className="required">
                    <Col componentClass={ControlLabel} xs={4}>
                        Parameter
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     required={true}
                                     componentClass="select">
                            {this.renderParameterChoices()}
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup validationState={this.getValueValidationStateName()}
                           controlId="valueControl" className="required">
                    <Col componentClass={ControlLabel} xs={4}>
                        Value
                    </Col>
                    <Col xs={8}>
                        <FormControl value={this.state.value}
                                     autoCorrect="off"
                                     required={true}
                                     pattern="[0-9.]*"
                                     onChange={this.handleValueChange}/>
                        <FormControl.Feedback />
                    </Col>

                </FormGroup>
                <FormGroup>
                    <Col xs={12}>
                        <ButtonGroup vertical block={true}>
                            <Button type="button"
                                    bsStyle="success"
                                    bsSize="large"
                                    onClick={this.submit}
                                    disabled={!this.getFormValidationState()}
                                    ref="submitButton">Check</Button>
                        </ButtonGroup>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

SampleObservationForm.propTypes = {
    submitAction: PropTypes.func,
    getParameters: PropTypes.func,
    parameters: PropTypes.array
};

SampleObservationForm = connect(mapStateToProps, mapDispatchToProps)(SampleObservationForm);
export default SampleObservationForm