import React, {Component, PropTypes} from 'react';
import {
    Form,
    Col,
    FormGroup,
    FormControl,
    ButtonGroup,
    Button,
    ControlLabel
} from 'react-bootstrap';


var clearDecimalInput = function(value){
    var parts = value.replace(/[^0-9.,]/g,'').replace(/,/g, '.').split('.');
    var newValue = parts[0];
    if (parts.length > 1){
        newValue +=  "." + parts.slice(1).join("");
    }
    return newValue;
};

export default class SampleObservationForm extends Component {
    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.getValueValidationState = this.getValueValidationState.bind(this);
        this.handleTimestampChange = this.handleTimestampChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
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
            value: ''
        }
    }

    getFormValidationState() {
        return (this.state.birthday && this.state.timestamp && this.getValueValidationState() && (this.state.birthday < this.state.timestamp))
    }

    handleValueChange(event) {
        var newValue = clearDecimalInput(event.target.value);
        this.setState({value: newValue});
    }

    getValueValidationState(){
        return this.state.value !== '' && !isNaN(this.state.value) && this.state.value > 0
    }

    getValueValidationStateName() {
        if (this.getValueValidationState()){
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
                <FormGroup controlId="birthdayControl">
                    <Col componentClass={ControlLabel} xs={4}>
                        Birthday
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     onChange={this.handleBirthdayChange}
                                     value={this.state.birthday}
                                     type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="timestampControl">
                    <Col componentClass={ControlLabel} xs={4}>
                        Timestamp
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     value={this.state.timestamp}
                                     onChange={this.handleTimestampChange}
                                     type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} xs={4}>
                        Parameter
                    </Col>
                    <Col xs={8}>
                        <FormControl className="min-width-95p"
                                     componentClass="select">
                            <option value="height">Height</option>
                            <option value="weight">Weight</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup validationState={this.getValueValidationStateName()}
                           controlId="valueControl">
                    <Col componentClass={ControlLabel} xs={4}>
                        Value
                    </Col>
                    <Col xs={8}>
                        <FormControl value={this.state.value}
                                     autoCorrect="off"
                                     pattern="[0-9.]*"
                                     onChange={this.handleValueChange}/>
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
    submitAction: PropTypes.func
};

SampleObservationForm.defaultProps = {
    submitAction: function (observation) {
        console.log(observation)
    }
};