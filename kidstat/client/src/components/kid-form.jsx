var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var DropdownButton = ReactBootstrap.DropdownButton;
var Glyphicon = ReactBootstrap.Glyphicon;
var DatePicker = require('react-date-picker');
var Formsy = require('formsy-react');

var Actions = require('../actions');


var RegularInput = React.createClass({
    mixins: [Formsy.Mixin],
    getDefaultProps: function () {
        return {type: 'text'}
    },
    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
    },
    render: function () {
        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        var errorMessage = this.getErrorMessage();

        return (
            <div className={className}>
                <Input label={this.props.name}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       value={this.getValue()}
                       onChange={this.changeValue}/>
                <span>{errorMessage}</span>
            </div>
        );
    }
});

var GenderInput = React.createClass({
    mixins: [Formsy.Mixin],
    changeValue: function (value) {
        this.setValue(value)
    },
    render: function () {
        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        var errorMessage = this.getErrorMessage();

        return (
            <div className={className}>
                <div className="form-group">
                    <label className="control-label">{this.props.name}</label>
                    <ButtonGroup>
                        <Button onClick={this.changeValue.bind(this, 'male')}
                                active={this.getValue() === 'male'}>Boy</Button>
                        <Button onClick={this.changeValue.bind(this, 'female')}
                                active={this.getValue() === 'female'}>Girl</Button>
                    </ButtonGroup>
                </div>
                <span>{errorMessage}</span>
            </div>
        );
    }
});


var DateTimeInput = React.createClass({
    mixins: [Formsy.Mixin],
    changeCalendarValue: function (dateString, moment) {
        this.setValue(moment);
    },
    getPrettyDate: function(){
        var value = this.getValue();
        if (value){
            return value.format('YYYY-MM-DD');
        }
        return value
    },
    render: function () {
        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
        var errorMessage = this.getErrorMessage();
        const innerDropdown = (
            <DropdownButton title={<Glyphicon glyph="calendar" />}
                            id="calendar-dropdown">
                <DatePicker onChange={this.changeCalendarValue}/>
            </DropdownButton>);
        return (
            <div className={className}>
                <div className="form-group">
                    <label className="control-label">{this.props.name}</label>
                    <Input type="text"
                           buttonAfter={innerDropdown}
                           value={this.getPrettyDate()}/>
                </div>
                <span>{errorMessage}</span>
            </div>
        );
    }
});


module.exports = React.createClass({
    getInitialState: function () {
        return {
            canSubmit: false
        }
    },

    submit: function (model) {
        var kid = {name: model.Name,
                   gender: model.Gender,
                   birthday: model.Birthday.format('YYYY-MM-DD') + 'T00:00:00Z'};
        Actions.addNewKid(kid);
    },
    enableButton: function () {
        this.setState({
            canSubmit: true
        });
    },
    disableButton: function () {
        this.setState({
            canSubmit: false
        });
    },
    render: function () {
        return (
            <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton}
                         onInvalid={this.disableButton}>
                <RegularInput name="Name" required/>
                <DateTimeInput name="Birthday" required/>
                <GenderInput name="Gender"/>
                <ButtonInput type="submit" disabled={!this.state.canSubmit}
                             value="Submit"/>
            </Formsy.Form>
        );
    }

});