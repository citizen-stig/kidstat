var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var Actions = require('../actions.jsx');
var KidsStore = require('../stores/kids-store.jsx');
var KidForm = require('./kid-form.jsx');

module.exports = React.createClass({
    mixins: [ Reflux.listenTo(KidsStore, "handleKidActions") ],
    getInitialState: function() {
        return {showModal: false};
    },
    handleKidActions: function (event) {
        if(event === 'change'){ this.close() }
    },
    close: function() { this.setState({showModal: false}); },
    addKid: function(kid){ Actions.addNewKid(kid); },
    open: function() { this.setState({showModal: true}); },
    render: function () {
        return <div className="pull-right">
            <Button onClick={this.open}>Add Kid</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <KidForm buttonText="Add New Kid" submitAction={this.addKid}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
});