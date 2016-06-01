var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var Actions = require('../actions.jsx');
var KidsStore = require('../stores/kids-store');

var KidDetail = require('./kid-detail.jsx');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(KidsStore, "handleKids")
    ],
    getInitialState: function () { return {kids: []} },
    componentWillMount: function () { Actions.getKids(); },
    handleKids: function (event, kids) {
        if (event === 'change'){this.setState({kids: kids});}
    },
    renderKidsList: function () {
        return this.state.kids.map(function(kid){
            return <ListGroupItem eventKey={kid.id} key={kid.id}>
                    <KidDetail kid={kid}/>
            </ListGroupItem>
        })
    },
    render: function () {
        return <ListGroup>
                {this.renderKidsList()}
            </ListGroup>
    }
});