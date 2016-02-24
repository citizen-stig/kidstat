var React = require('react');
var Reflux = require('reflux');

var KidsStore = require('../stores/kids-store');
var Actions = require('../actions');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(KidsStore, "handleKids")
    ],
    getInitialState: function () {
        return {kids: []}
    },
    componentWillMount: function () {
        Actions.getKids();
    },
    handleKids: function (event, kids) {
        this.setState({kids: kids});
    },
    renderKidsList: function () {
        return this.state.kids.map(function (kid) {
            return <li className="list-group-item" key={kid.id}>
                <h1>{kid.name}</h1>
                <p>{kid.birthday}</p>
            </li>
        });
    },
    render: function () {
        return <div className="text-center row">
            <div className="col-md-11 col-md-offest-1">
                <p>This is Kids LIST!!!!</p>
                <ul className="list-group">
                    {this.renderKidsList()}
                </ul>
            </div>
        </div>
    }

})
;