var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Button = ReactBootstrap.Button;

var Actions = require('../../actions.jsx');
var KidsStore = require('../../stores/kids-store.jsx');
var Modal = require('../common/modal.jsx');
var KidForm = require('./form.jsx');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(KidsStore, "handleKidActions")],
    openModal: function () {
        this.refs.modal.open();
    },
    addKid: function (kid) {
        this.setState({error: ''});
        Actions.addNewKid(kid);
    },
    handleKidActions: function(event){
        if(event === KidsStore.events.change){
            this.refs.modal.close() }
        else if (event == KidsStore.events.addError){
            this.setState({error: message}) }
    },
    render: function () {
        return <div className="pull-right">
            <Button onClick={this.openModal}>Add Kid</Button>
            <Modal title="Add Kid" ref="modal">
                <KidForm buttonText="Add New Kid" submitAction={this.addKid}/>
            </Modal>
        </div>
    }
});