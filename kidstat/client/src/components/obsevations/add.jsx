var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Button = ReactBootstrap.Button;

var Actions = require('../../actions.jsx');
var ObservationForm = require('./form.jsx');
var Modal = require('../common/modal.jsx');
var ObservationStore = require('../../stores/observations-store.jsx');


module.exports = React.createClass({
    mixins: [Reflux.listenTo(ObservationStore, "handleObservationStore")],
    openModal: function () {
        this.refs.modal.open();
    },
    handleObservationStore: function (event) {
        console.log("handling something from observation store");
        console.log(event);
    },
    addObservation: function (observation) {
        Actions.addObservation(this.props.kid, observation);
    },
    render: function () {
        return <div className="pull-right">
            <Button onClick={this.openModal}>Add Observation</Button>
            <Modal title="Add Observation" ref="modal">
                <ObservationForm submitAction={this.addObservation}/>
            </Modal>
        </div>
    }
});