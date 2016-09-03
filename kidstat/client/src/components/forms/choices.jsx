var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var Radio = ReactBootstrap.Radio;

module.exports = React.createClass({
    propTypes: {
        choices: React.PropTypes.array.isRequired,
        name: React.PropTypes.string.isRequired,
        labelCol: React.PropTypes.number,
        inputCol: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            labelCol: 3,
            inputCol: 9
        }
    },
    getInitialState: function() {
        return {value: '', error: ''};
    },
    changeValue: function(value){
        this.setState({value: value});
    },
    renderChoices: function (choices) {
        return choices.map(function (choice) {
            return <Radio
                key={choice.value}
                onClick={this.changeValue.bind(this, choice.value)}
                checked={this.state.value === choice.value}>{choice.label}
            </Radio>
        }.bind(this))
    },
    render: function () {
        return (<FormGroup controlId={"FormControls" + this.props.name}>
                <Col componentClass={ControlLabel} sm={this.props.labelCol}>
                    {this.props.name}
                </Col>
                <Col sm={this.props.inputCol}>
                    {this.renderChoices(this.props.choices)}
                </Col>
            </FormGroup>
        );
    }
});