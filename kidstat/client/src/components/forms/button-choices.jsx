var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;

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
    getInitialState() {
        return {value: '', error: ''};
    },
    changeValue(value){
        this.setState({value: value});
    },
    renderChoices: function (choices) {
        return choices.map(function (choice) {
            return <Button
                key={choice.value}
                onClick={this.changeValue.bind(this, choice.value)}
                active={this.state.value === choice.value}>{choice.label}
            </Button>
        }.bind(this))
    },
    render: function () {
        return (<FormGroup controlId={"FormControls" + this.props.name}>
                <Col componentClass={ControlLabel} sm={this.props.labelCol}>
                    {this.props.name}
                </Col>
                <Col sm={this.props.inputCol}>
                    <ButtonGroup>
                        {this.renderChoices(this.props.choices)}
                    </ButtonGroup>
                </Col>
            </FormGroup>
        );
    }
});