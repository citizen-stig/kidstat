var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var HelpBlock = ReactBootstrap.HelpBlock;

var Actions = require('../../actions.jsx');
var ObservationForm = require('./form.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {showModal: false, error: ''};
    },
    close: function() { this.setState({showModal: false}); },
    open: function() { this.setState({showModal: true}); },
    render: function () {
        return <div className="pull-right">
            <Button onClick={this.open}>Add Observation</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Observation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
                    <ObservationForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
});