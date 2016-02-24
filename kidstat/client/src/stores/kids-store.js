/**
 * Created by nikolaygolub on 20/02/16.
 */
var Reflux = require('reflux');
var Api = require('../api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getKids: function(){
        return Api.authorizedGet('kids')
            .then(function(data){
                this.kids = data.data;
                this.triggerKidsReceived()
            }.bind(this));
    },
    triggerKidsReceived: function(){
        this.trigger('change', this.kids);
    }
});