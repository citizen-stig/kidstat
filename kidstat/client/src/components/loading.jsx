var React = require('react');
var AuthStore = require('../stores/auth-store');
var KidsStore = require('../stores/kids-store');
var Reflux = require('reflux');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuth"),
        Reflux.listenTo(KidsStore, "handleAuth")
    ],
    handleAuth: function(event){
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
                <img id="loading-image" src="/static/images/loader.gif" alt="Loading..." />
            </div>
    }
});