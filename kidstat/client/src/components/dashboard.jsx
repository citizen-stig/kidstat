var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;

var KidsList = require('./kids/list.jsx');
var AddKid = require('./kids/add.jsx');

module.exports = React.createClass({
    render: function () {
        return <Row>
            <KidsList/>
            <AddKid/>
        </Row>
    }
});