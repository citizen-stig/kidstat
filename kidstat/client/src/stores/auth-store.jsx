var Reflux = require('reflux');
var Api = require('../api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    triggerAuthenticated(){
        console.log("Trigger authenticated");
        this.trigger('authenticated');
    },
    triggerLogout(){
        this.trigger('logout');
    },
    Login(email, password){
        console.log('Auth-Store login is called');
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
        localStorage.removeItem(tokenName);
        this.triggerLogout();
    }
});