var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

module.exports = React.createClass({
    propTypes: {
        placeholder: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        labelCol: React.PropTypes.number,
        inputCol: React.PropTypes.number,
        type: React.PropTypes.string,
        value: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            placeholder: '',
            labelCol: 3,
            inputCol: 9,
            type: 'text'
        }
    },
    getInitialState() {
        return {value: this.props.value, error: ''};
    },
    changeValue(){
        this.setState({value: ReactDOM.findDOMNode(this.refs.input).value})
    },
    render: function () {
        return (<FormGroup controlId={"FormControls" + this.props.name}>
                <Col componentClass={ControlLabel} sm={this.props.labelCol}>
                    {this.props.name}
                </Col>
                <Col sm={this.props.inputCol}>
                    <FormControl
                        ref="input"
                        type={this.props.type}
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onChange={this.changeValue}/>
                    <FormControl.Feedback />
                </Col>
            </FormGroup>
        );
    }
});