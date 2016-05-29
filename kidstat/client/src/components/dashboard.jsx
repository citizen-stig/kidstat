var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var KidsList = require('./kids-list.jsx');
var AddKid = require('./add-kid.jsx');

module.exports = React.createClass({
    render: function(){
        return <Row>
            <AddKid/>
            <KidsList/>
            </Row>
    }
});

