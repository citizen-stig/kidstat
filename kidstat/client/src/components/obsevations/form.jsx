var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Form = ReactBootstrap.Form;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;
var ControlLabel = ReactBootstrap.ControlLabel;


var RegularInput = require('../forms/input.jsx');


module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            buttonText: "Add Observation",
            observation: {timestamp: '', parameter: '', value: ''},
            submitAction: function(observation){console.log(observation)}
        }
    },
    submit: function () {
        var observation = {timestamp: this.refs.timestamp.state.value,
                           parameter: this.refs.parameter.state.value,
                           value: this.refs.observationValue.state.value};
        this.props.submitAction(observation);
    },
    changeParameterValue: function(){
        this.refs.parameter.setState(
            {value: ReactDOM.findDOMNode(this.refs.parameter).value});
    },
    render: function () {
        return (
            <Form horizontal>
                <RegularInput name="Timestamp"
                              value={this.props.observation.timestamp}
                              ref="timestamp"
                              type="date"/>
                <RegularInput name="Value"
                              value={this.props.observation.value}
                              ref="observationValue"
                              type="number"/>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={3}>
                        Parameter
                    </Col>
                    <Col sm={9}>
                        <FormControl componentClass="select"
                                     ref="parameter"
                                     value={this.props.observation.parameter.value}
                                     placeholder="parameter"
                                     onChange={this.changeParameterValue}>
                            <option value="height">Height</option>
                            <option value="weight">Weight</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={3} sm={9}>
                        <Button type="button"
                                onClick={this.submit}
                                ref="submitButton">{this.props.buttonText}</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
});