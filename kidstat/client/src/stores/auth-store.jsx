var Reflux = require('reflux');
var Api = require('../api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    triggerAuthenticated(){
        this.trigger('authenticated');
    },
    triggerLogout(){
        this.trigger('logout');
    },
    Login(email, password){
        var body = JSON.stringify({
            email: email,
            password: password
        });
        return Api.post('auth', body)
            .then(function (data) {
                console.log("Data received");
                Api.storeToken(data['access_token']);
                this.triggerAuthenticated();
            }.bind(this));
    },
    Logout(){
        Api.removeToken();
        this.triggerLogout();
    }
});