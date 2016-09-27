import React, {Component, PropTypes} from 'react';
import {
    Col,
    Form,
    FormGroup,
    ButtonGroup,
    Button,
} from 'react-bootstrap';

import GenderSelectContainer
    from '../../containers/observations/sample-observation/gender-select.jsx';
import BirthdayInput
    from '../../containers/observations/sample-observation/birthday-input.jsx';
import TimestampInput
    from '../../containers/observations/sample-observation/timestamp-input.jsx';
import ParameterSelect
    from '../../containers/observations/sample-observation/parameters-select.jsx';
import ValueInput
    from '../../containers/observations/sample-observation/value-input.jsx';
import ErrorsListContainer
    from '../../containers/observations/sample-observation/errors-list.jsx';


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

export default SampleObservationForm
