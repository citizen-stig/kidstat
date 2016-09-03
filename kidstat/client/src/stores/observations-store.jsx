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
    init: function() {
        this.observations = {};
    },
    getObservationsUrl: function(kid){
        return "kids/" + kid['id'] + "/observations";
    },
    getObservations: function(kid){
        var url = this.getObservationsUrl(kid);
        this.triggerLoading();
        return Api.authorizedGet(url).then(
            function(data){
                console.log('=======');
                console.log(data);
                console.log('=======');
                this.observations[kid.id] = data.data;
                this.triggerObservationReceived();
            }.bind(this)
        )
    },
    addObservation: function(kid, observation){
        this.triggerLoading();
        var url = this.getObservationsUrl(kid);
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
        this.trigger(this.events.change, this.observations);
    }
});