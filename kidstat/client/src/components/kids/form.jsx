var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Form = ReactBootstrap.Form;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var Button = ReactBootstrap.Button;

var RegularInput = require('../forms/input.jsx');
var ChoicesInput = require('../forms/choices.jsx');


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
    getBirthdayValue: function(){
        if (this.props.kid.birthday !== '' && this.props.kid.birthday != null){
            return this.props.kid.birthday.toISOString().split("T")[0];
        }
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
                <ChoicesInput name="Gender"
                              value={this.props.kid.gender}
                              ref="gender"
                              choices={genderChoices}/>
                <RegularInput name="Birthday"
                              value={this.getBirthdayValue()}
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