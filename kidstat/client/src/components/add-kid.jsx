var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Row = ReactBootstrap.Row;

var Actions = require('../actions');
var KidForm = require('./kid-form.jsx');

module.exports = React.createClass({
    getInitialState() {
        return {showModal: false};
    },

    close() {
        this.setState({showModal: false});
    },
    addKid(kid){
        Actions.addNewKid(kid);
    },
    open() {
        this.setState({showModal: true});
    },
    render: function () {
        return <Row>
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
        </Row>
    }
});