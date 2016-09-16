import React, {Component, PropTypes} from 'react';

import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';

export default class ParameterSelect extends Component {

    renderParameterChoices() {
        return this.props.parameters.map(function (parameter) {
            return <option key={parameter.id}
                           value={parameter.name}>
                {parameter.name}, {parameter.unit}
            </option>
        })
    }
    render() {
        return <FormGroup controlId="formControlsSelect" className="required">
            <Col componentClass={ControlLabel} xs={4}>Parameter</Col>
            <Col xs={8}>
                <FormControl className="min-width-95p"
                             required={true}
                             value={this.props.value}
                             componentClass="select"
                             onChange={this.props.onChange}>
                    {this.renderParameterChoices()}
                </FormControl>
            </Col>
        </FormGroup>
    }
}
