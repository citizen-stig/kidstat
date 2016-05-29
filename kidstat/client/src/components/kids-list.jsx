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
    getInitialState: function () {
        return {kids: []}
    },
    componentWillMount: function () {
        // Actions.getKids();
        var kids = [
            {'id': 1, 'name': 'John', 'birthday': '2015-01-01'},
            {'id': 2, 'name': 'Jack', 'birthday': '2015-02-02'},
            {'id': 3, 'name': 'Joseph', 'birthday': '2015-03-03'},
            {'id': 4, 'name': 'Jason', 'birthday': '2015-04-04'}
        ];
        this.handleKids("event", kids);
    },
    handleKids: function (event, kids) {
        this.setState({kids: kids});
    },
    renderKidsList: function () {
        return this.state.kids.map(function(kid){
            return <ListGroupItem eventKey={kid.id} key={kid.id}>
                    <KidDetail kid={kid}/>
            </ListGroupItem>
        })
    },
    render: function () {
        var kids = [
            {'name': 'John', 'birthday': '2015-01-01'},
            {'name': 'Jack', 'birthday': '2015-02-02'},
            {'name': 'Joseph', 'birthday': '2015-03-03'},
            {'name': 'Jason', 'birthday': '2015-04-04'}
        ];
        return <ListGroup>
                {this.renderKidsList()}
            </ListGroup>
    }
});