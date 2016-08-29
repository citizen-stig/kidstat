var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var HelpBlock = ReactBootstrap.HelpBlock;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {title: '',}
    },
    getInitialState: function() {
        return {showModal: false, error: ''};
    },
    close: function() { this.setState({showModal: false}); },
    open: function() { this.setState({showModal: true}); },
    render: function () {
        return<Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
    }
});