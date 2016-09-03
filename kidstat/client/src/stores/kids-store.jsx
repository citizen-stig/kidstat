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
    parseKid: function(kid){
        kid.birthday = new Date(kid.birthday);
        return kid;
    },
    updateKidInStore: function(new_kid){
        for(var i = 0; i < this.kids.length; i++){
            var current_kid = this.kids[i];
            if (new_kid['id'] === current_kid['id']){
                this.kids[i] = new_kid;
                break;
            }
        }
    },
    getKids: function(){
        this.triggerLoading();
        return Api.authorizedGet('kids')
            .then(function(data){
                this.kids = [];
                for (var i=0; i<data.data.length; i++){
                    this.kids.push(this.parseKid(data.data[i]));
                }
                this.triggerKidsReceived()
            }.bind(this));
    },
    errorHandler: function(error){
        return error.response.json()
            .then(function(data){
                this.triggerAddError(data['error'])
            }.bind(this))
    },
    addNewKid: function(kid){
        this.triggerLoading();
        return Api.authorizedPost('kids', kid)
            .then(function(new_kid){
                this.kids.push(this.parseKid(new_kid));
                this.triggerKidsReceived();
            }.bind(this)).catch(this.errorHandler.bind(this));
    },
    updateKid: function(kid){
        this.triggerLoading();
        var url = 'kids/' + kid['id'];
        return Api.authorizedPut(url, kid)
            .then(function(updated_kid){
                this.updateKidInStore(this.parseKid(updated_kid));
                this.triggerKidsReceived();
            }.bind(this)).catch(this.errorHandler.bind(this))
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
        this.trigger(this.events.change, this.kids);
    },
    triggerAddError: function(message){
        this.trigger(this.events.addError, message);
    },
    triggerLoading: function(){
        this.trigger(this.events.loading);
    }
});