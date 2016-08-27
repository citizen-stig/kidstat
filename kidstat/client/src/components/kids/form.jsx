var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Form = ReactBootstrap.Form;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var Button = ReactBootstrap.Button;

var RegularInput = require('../forms/input.jsx');
var ButtonChoiceInput = require('../forms/button-choices.jsx');


module.exports = React.createClass({
     getDefaultProps: function () {
        return {buttonText: "Add Kid",
                kid: {name: '', gender: '', birthday: ''},
                submitAction: function(kid){console.log(kid)}}
     },
    submit: function () {
        var kid = {name: this.refs.name.state.value,
                   gender: this.refs.gender.state.value,
                   birthday: this.refs.birthday.state.value};
        this.props.submitAction(kid);
    },

    render: function () {
        var genderChoices = [
            {label: 'Boy', value: 'male'},
            {label: 'Girl', value: 'female'}
        ];
        return (
            <Form horizontal>
                <RegularInput name="Name" ref="name"
                              value={this.props.kid.name}/>
                <ButtonChoiceInput name="Gender"
                                   value={this.props.kid.gender}
                                   ref="gender"
                                   choices={genderChoices}/>
                <RegularInput name="Birthday"
                              value={this.props.kid.birthday}
                              ref="birthday"
                              type="date"/>
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