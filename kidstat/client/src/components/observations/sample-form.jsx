import React, {Component, PropTypes} from 'react';
import {
    Col,
    Form,
    FormGroup,
    ButtonGroup,
    Button,
} from 'react-bootstrap';


import {connect} from 'react-redux'

import {
    fetchCategoryForSampleObservation,
    fetchParameters
} from '../../actions.jsx'

import GenderSelectContainer
    from '../../containers/observations/sample-observation/gender-select.jsx'
import BirthdayInput
    from '../../containers/observations/sample-observation/birthday-input.jsx'
import TimestampInput
    from '../../containers/observations/sample-observation/timestamp-input.jsx'
import ParameterSelect
    from '../../containers/observations/sample-observation/parameters-select.jsx'
import ValueInput
    from '../../containers/observations/sample-observation/value-input.jsx';
import ErrorsListContainer
    from '../../containers/observations/sample-observation/errors-list.jsx';


const mapStateToProps = (state) => {
    let sampleObservation = state.sampleObservation.data;
    let observation = {
        gender: sampleObservation.gender,
        birthday: sampleObservation.birthday,
        timestamp: sampleObservation.timestamp,
        parameter: sampleObservation.parameter,
        value: sampleObservation.value
    };
    return {
        isValid: sampleObservation.isValid,
        observation: observation,
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


class SampleObservationForm extends Component {
    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.getParameters();
    }

    onFormSubmit(event) {
        if (this.props.isValid) {
            this.submit()
        }
        event.preventDefault();
    }

    submit() {
        this.props.submitAction(this.props.observation);
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                <ErrorsListContainer/>
                <GenderSelectContainer/>
                <BirthdayInput/>
                <TimestampInput/>
                <ParameterSelect/>
                <ValueInput/>
                <FormGroup>
                    <Col xs={12}>
                        <ButtonGroup vertical block={true}>
                            <Button type="button"
                                    bsStyle="success"
                                    bsSize="large"
                                    onClick={this.submit}
                                    disabled={!this.props.isValid}
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
    observation: PropTypes.object,
    isValid: PropTypes.bool
};


SampleObservationForm = connect(mapStateToProps, mapDispatchToProps)(SampleObservationForm);
export default SampleObservationForm