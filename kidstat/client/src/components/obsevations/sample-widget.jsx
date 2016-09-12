var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Col = ReactBootstrap.Col;

var ObservationStore = require('../../stores/observations-store.jsx');
var SampleObservationForm = require('./sample-form.jsx');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(ObservationStore, "handleObservationStore")],
    getInitialState: function () {
        return {category: null}
    },
    handleObservationStore: function(event, category){
        if (event == 'sampleCategoryReceived'){
            this.setState({category: category})
        }
    },
    render: function () {
        return <div>
            <h2>Try Now!</h2>
            <Col xs={8}>
                <SampleObservationForm/>
            </Col>
            <Col xs={4}>
                <p>Check category of latest observation</p>
                {this.state.category ? this.state.category : ''}
            </Col>
        </div>
    }
});