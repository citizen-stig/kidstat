var Reflux = require('reflux');
var Api = require('../api.jsx');
var Actions = require('../actions.jsx');

module.exports = Reflux.createStore({
    listenables: [Actions],
    triggerAuthenticated(){
        this.trigger('authenticated');
    },
    triggerLogout(){
        this.trigger('logout');
    },
    triggerLoading(){
        this.trigger('loading');
    },
    Login(email, password){
        this.triggerLoading();
        var body = JSON.stringify({
            email: email,
            password: password
        });
        return Api.post('auth', body)
            .then(function (data) {
                Api.storeToken(data['access_token']);
                this.triggerAuthenticated();
            }.bind(this));
    },
    CheckAuthorization(){
        this.triggerLoading();
        var token = Api.getToken();
        if (token){
            Api.authorizedGet('check-token')
                .then(function (data) {
                    this.triggerAuthenticated();
                }.bind(this))
                .catch(function(error){
                    this.triggerLogout()
                }.bind(this))
        } else {
            this.triggerLogout();
        }

    },
    Logout(){
        Api.removeToken();
        this.triggerLogout();
    }
});