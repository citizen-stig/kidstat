var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;

module.exports = React.createClass({
    getInitialState() {return {showModal: false};},
    close() {this.setState({showModal: false});},
    open() {this.setState({showModal: true});},
    render: function () {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.props.children }
                    </Modal.Body>
                </Modal>
            </div>)
    }
});