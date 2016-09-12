var Reflux = require('reflux');
var Api = require('../api.jsx');
var Actions = require('../actions.jsx');


module.exports = Reflux.createStore({
    listenables: [Actions],
    events: {
        loading: 'loading',
        change: 'change',
        error: 'error',
        sampleCategoryReceived: 'sampleCategoryReceived',
        sampleCategoryError: 'sampleCategoryError'
    },
    init: function () {
        this.observations = {};
        this.sampleCategory = null;
    },
    parseObservation: function(observation){
        observation.timestamp = new Date(observation.timestamp);
        return observation;
    },
    sortObservationsForKid: function (kid) {
        var observations = this.observations[kid.id];
        // Sort by timestamp in reversed order
        observations.sort(function (a, b) {
                if (a.timestamp > b.timestamp) {return -1; }
                else if (a.timestamp < b.timestamp) {return 1; }
                else {return 0;}
            }
        )
    },
    getObservationsUrl: function (kid) {
        return "kids/" + kid['id'] + "/observations";
    },
    getObservations: function (kid) {
        var url = this.getObservationsUrl(kid);
        this.triggerLoading();
        return Api.authorizedGet(url).then(
            function (data) {
                this.observations[kid.id] = [];
                for(var i = 0; i < data.data.length; i++){
                    var observation = this.parseObservation(data.data[i]);
                    this.observations[kid.id].push(observation);
                }
                this.sortObservationsForKid(kid);
                this.triggerObservationReceived();
            }.bind(this)
        )
    },
    addObservation: function (kid, observation) {
        this.triggerLoading();
        var url = this.getObservationsUrl(kid);
        return Api.authorizedPost(url, observation).then(
            function (new_observation) {
                var observation = this.parseObservation(new_observation);
                if(kid.id in this.observations) {
                    this.observations[kid.id].push(observation);
                    this.sortObservationsForKid(kid);
                } else {
                    this.observations[kid.id] = [observation];
                }
                this.triggerObservationReceived();
            }.bind(this)
        )
    },
    requestSampleObservation: function(sample){
        this.triggerLoading();
        return Api.post('try', JSON.stringify(sample)).then(
            function(response) {
                this.sampleCategory = response['category'];
                this.triggerObservationSampleReceived();
            }.bind(this)).catch(function(error){
                error.response.json().then(function(data){
                    this.trigger(this.events.sampleCategoryError, data['errors'])
                }.bind(this))
            }.bind(this))
    },
    triggerLoading: function () {
        this.trigger(this.events.loading);
    },
    triggerObservationReceived: function () {
        this.trigger(this.events.change, this.observations);
    },
    triggerObservationSampleReceived: function(){
        this.trigger(this.events.sampleCategoryReceived, this.sampleCategory)
    }
});