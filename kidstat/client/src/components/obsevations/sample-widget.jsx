var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Alert = ReactBootstrap.Alert;
var Col = ReactBootstrap.Col;

var Actions = require('../../actions.jsx');
var ObservationStore = require('../../stores/observations-store.jsx');
var SampleObservationForm = require('./sample-form.jsx');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(ObservationStore, "handleObservationStore")],
    getInitialState: function () {
        return {category: null, errors: null}
    },
    handleObservationStore: function(event, data){
        if (event == ObservationStore.events.sampleCategoryReceived){
            this.setState({category: data})
        } else if (event = ObservationStore.events.sampleCategoryError) {
            this.setState({errors: data})
        }
    },
    submitObservationSample: function(observation){
        this.setState({errors: null});
        Actions.requestSampleObservation(observation);
    },
    renderCategory: function(){
        return <Alert bsStyle="success">
                Category for this observation is <strong>{this.state.category}</strong>
            </Alert>
    },
    renderErrors: function(){
        return Object.keys(this.state.errors).map(function (field) {
            return this.state.errors[field].map(function (error) {
                return <Alert bsStyle="error"><strong>{field}</strong>: {error}</Alert>
            }.bind(this))
        }.bind(this))
    },
    render: function () {
        return <div>
            <h2>Try Now!</h2>
            <Col xs={8}>
                {this.state.errors ? this.renderErrors(): ''}
                <SampleObservationForm
                    submitAction={this.submitObservationSample}/>
            </Col>
            <Col xs={4}>
                <p>Check category of latest observation</p>
                {this.state.category ? this.renderCategory() : ''}
            </Col>
        </div>
    }
});