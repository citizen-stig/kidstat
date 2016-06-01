var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var HelpBlock = ReactBootstrap.HelpBlock;

var Actions = require('../actions.jsx');
var KidsStore = require('../stores/kids-store.jsx');
var KidForm = require('./kid-form.jsx');

module.exports = React.createClass({
    mixins: [ Reflux.listenTo(KidsStore, "handleKidActions") ],
    getInitialState: function() {
        return {showModal: false, error: ''};
    },
    handleKidActions: function (event, message) {
        if(event === KidsStore.events.change){
            this.close() }
        else if (event == KidsStore.events.addError){
            this.setState({error: message}) }
    },
    close: function() { this.setState({showModal: false}); },
    addKid: function(kid){
        this.setState({error: ''});
        Actions.addNewKid(kid);
    },
    open: function() { this.setState({showModal: true}); },
    render: function () {
        return <div className="pull-right">
            <Button onClick={this.open}>Add Kid</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
                    <KidForm buttonText="Add New Kid" submitAction={this.addKid}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
});