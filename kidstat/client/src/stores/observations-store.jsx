var Reflux = require('reflux');
var Api = require('../api.jsx');
var Actions = require('../actions.jsx');


module.exports = Reflux.createStore({
    listenables: [Actions],
    events: {
        change: 'change',
        loading: 'loading',
        addError: 'add-error'
    },
    addObservation: function(kid, observation){
        this.triggerLoading();
        var url = "kids/" + kid['id'] + "/observations";
        return Api.authorizedPost(url, observation).then(
            function(new_observation){
                console.log('Observation has been added!!!');
                console.log(new_observation);
                this.triggerObservationReceived();
            }.bind(this)
        )
    },
    triggerLoading: function(){
        this.trigger(this.events.loading);
    },
    triggerObservationReceived: function(){
        this.trigger(this.events.change);
    }
});