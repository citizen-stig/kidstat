var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var KidsList = require('./kids/list.jsx');
var AddKid = require('./kids/add.jsx');

module.exports = React.createClass({
    render: function(){
        return <Row>
            
            <KidsList/>
            <AddKid/>
            </Row>
    }
});

