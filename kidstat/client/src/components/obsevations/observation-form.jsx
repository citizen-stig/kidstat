import React, {Component, PropTypes} from 'react';

import {
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';

import {connect} from 'react-redux'


const mapStateToProps = (state, ownProps) => {
    let value;
    let parameters = state.parameters.data;
    if(parameters.length > 0){
        value = parameters[0]
    } else {
        value = ''
    }
    return {
        parameters: parameters,
        value: value,
        errors: state.parameters.errors
    }
};


class ParameterSelect extends Component {

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


ParameterSelect = connect(mapStateToProps)(ParameterSelect);
export default ParameterSelect;