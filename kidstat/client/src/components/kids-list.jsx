var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Reflux = require('reflux');

var Image = ReactBootstrap.Image;
var KidsStore = require('../stores/kids-store');
var Actions = require('../actions');
var KidForm = require('./kid-form');

var oneDay = 24*60*60*1000;

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
        if (event == 'change'){
            this.setState({kids: kids});
        }
    },
    getAgeDays: function(kid){
        var today = new Date();
        var birthday = Date.parse(kid.birthday);
        return Math.round((today.getTime() - birthday) / oneDay)
    },
    updateKid: function(kid){
        console.log('Are you going to update this kid');
        console.log(kid);
    },
    deleteKid: function(kid){
        Actions.deleteKid(kid);
    },
    renderKidsList: function () {
        return this.state.kids.map(function (kid) {
            return <li className="list-group-item" key={kid.id}>
                <div className="row">
                    <div className="col-md-2">
                         <Image src="http://placehold.it/150x150" circle />
                    </div>
                    <div className="col-md-4">
                        <h3>{kid.name}</h3>
                        <p>Age: {this.getAgeDays(kid)} days</p>
                    </div>
                    <div className="col-md-3">
                        <p>Width: N/A</p>
                        <p>Height: N/A</p>
                    </div>
                    <div className="col-md-3">
                        <div className="pull-right">
                        <i className="fa fa-pencil"
                           onClick={this.updateKid.bind(this, kid)}/>
                        <i className="fa fa-trash"
                           onClick={this.deleteKid.bind(this, kid)}/>
                        </div>
                    </div>
                </div>
            </li>
        }.bind(this));
    },
    render: function () {
        return <div>
            <div>
                <ul className="list-group">
                    {this.renderKidsList()}
                </ul>
            </div>
        </div>
    }

})
;