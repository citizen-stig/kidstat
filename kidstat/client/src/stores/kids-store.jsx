var Reflux = require('reflux');
var Api = require('../api.jsx');
var Actions = require('../actions.jsx');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getKids: function(){
        return Api.authorizedGet('kids')
            .then(function(data){
                this.kids = data.data;
                this.triggerKidsReceived()
            }.bind(this));
    },
    addNewKid: function(kid){
        this.triggerLoading();
        return Api.authorizedPost('kids', kid)
            .then(function(new_kid){
                    this.kids.push(new_kid);
                    this.triggerKidsReceived();
            }.bind(this));
    },
    deleteKid: function(kid){
        this.triggerLoading();
        var url = 'kids/' + kid['id'];
        return Api.authorizedDelete(url)
            .then(function(response){
                var kid_idx = this.findKidIndex(kid);
                if (kid_idx > -1){
                    this.kids.splice(kid_idx, 1);
                }
                this.triggerKidsReceived()
            }.bind(this))
    },
    findKidIndex: function(kid){
        var idx = -1;
        for(var i = 0; i < this.kids.length; i++){
            if (this.kids[i]['id'] === kid['id']){
                idx = i;
                break
            }
        }
        return idx;
    },
    triggerKidsReceived: function(){
        this.trigger('change', this.kids);
    },
    triggerLoading: function(){
        this.trigger('loading');
    }
});