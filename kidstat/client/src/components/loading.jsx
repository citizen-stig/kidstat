var React = require('react');
var AuthStore = require('../stores/auth-store.jsx');
var KidsStore = require('../stores/kids-store.jsx');
var Reflux = require('reflux');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleEvent"),
        Reflux.listenTo(KidsStore, "handleEvent")
    ],
    handleEvent: function(event){
        if (event == 'loading'){
            this.show();
        } else {
            this.hide();
        }
    },
    getInitialState: function () {
        return {active: false}
    },
    show: function(){
        this.setState({active: true})
    },
    hide: function(){
        this.setState({active: false})
    },
    render: function(){
        return <div className={this.state.active ? '' : 'hidden'} id="loading">
                <i id="spinner" class="fa fa-refresh fa-spin"></i>
            </div>
    }
});