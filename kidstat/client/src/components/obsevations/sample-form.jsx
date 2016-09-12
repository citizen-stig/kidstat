var React = require('react');
var ReactDOM = require('react-dom');
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
            observation: {
                birthday: '',
                timestamp: new Date().toISOString().split("T")[0],
                parameter: '',
                value: ''},
            parameters: ['height', 'weight'],
            genders: ['male', 'female'],
            submitAction: function(observation){console.log(observation)}
        }
    },
    componentDidMount: function(){
        this.refs.parameter.setState({value: this.props.parameters[0]});
        this.refs.gender.setState({value: this.props.genders[0]});
    },
    submit: function () {
        var observation = {
            gender: this.refs.gender.state.value,
            birthday: this.refs.birthday.state.value,
            timestamp: this.refs.timestamp.state.value,
            parameter: this.refs.parameter.state.value,
            value: this.refs.observationValue.state.value};
        console.log("Submit Form");
        console.log(observation);
        this.props.submitAction(observation);

    },
    changeSelectValue: function(ref){
        ref.setState({value: ReactDOM.findDOMNode(ref).value});
    },
    changeParameterValue: function(){
        this.changeSelectValue(this.refs.parameter);
    },
    changeGenderValue: function(){
        this.changeSelectValue(this.refs.gender);
    },
    renderParametersOptions: function(){
        return this.props.parameters.map(function(parameter){
            return <option value={parameter} key={parameter}>{parameter}</option>
        })
    },
    render: function () {
        return (
            <Form horizontal>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={3}>
                        Gender
                    </Col>
                    <Col sm={9}>
                        <FormControl componentClass="select"
                                     ref="gender"
                                     value={this.props.observation.gender}
                                     placeholder="gender"
                                     onChange={this.changeGenderValue}>
                            <option value="male">Boy</option>
                            <option value="female">Girl</option>
                        </FormControl>
                    </Col>
                </FormGroup>
                <RegularInput name="Birthday"
                              value={this.props.observation.birthday}
                              ref="birthday"
                              type="date"/>
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
                            {this.renderParametersOptions()}
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