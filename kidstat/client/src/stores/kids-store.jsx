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
        console.log('Parsing kid');
        console.log(kid);
        kid.birthday = new Date(kid.birthday);
        console.log(kid);
        return kid;
    },
    getKids: function(){
        return Api.authorizedGet('kids')
            .then(function(data){
                this.kids = [];
                console.log('lalala');
                for (var i=0; i<data.data.length; i++){
                    this.kids.push(this.parseKid(data.data[i]));
                }
                console.log(this.kids);
                this.triggerKidsReceived()
            }.bind(this));
    },
    addNewKid: function(kid){
        this.triggerLoading();
        return Api.authorizedPost('kids', kid)
            .then(function(new_kid){
                    this.kids.push(this.parseKid(new_kid));
                    this.triggerKidsReceived();
            }.bind(this)).catch(function (error) {
                return error.response.json()
                    .then(function(data){
                        this.triggerAddError(data['error'])
                    }.bind(this))
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
        this.trigger(this.events.change, this.kids);
    },
    triggerAddError: function(message){
        this.trigger(this.events.addError, message);
    },
    triggerLoading: function(){
        this.trigger(this.events.loading);
    }
});