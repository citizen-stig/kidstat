var Reflux = require('reflux');
var Api = require('../api.jsx');
var Actions = require('../actions.jsx');

module.exports = Reflux.createStore({
    listenables: [Actions],
    triggerAuthenticated: function(){
        this.trigger('authenticated');
    },
    triggerAuthenticationFailed: function(event){
        this.trigger('authenticationFailed', event);
    },
    triggerSignupFailed: function(event){
        this.trigger('signupFailed', event)
    },
    triggerLogout: function(){
        this.trigger('logout');
    },
    triggerLoading: function(){
        this.trigger('loading');
    },
    _storeToken: function(data){
        Api.storeToken(data['access_token']);
        this.triggerAuthenticated();
    },
    Login: function(email, password){
        this.triggerLoading();
        var body = JSON.stringify({
            email: email,
            password: password
        });
        return Api.post('auth', body)
            .then(this._storeToken)
            .catch(function(error){
                return error.response.json()
                    .then(function(data){
                        this.triggerAuthenticationFailed(data['description']);
                    }.bind(this))
                    .catch(function (exc) {
                        this.triggerAuthenticationFailed(error)
                    }.bind(this));
            }.bind(this));
    },
    Signup: function(firstName, lastName, email, password){
        this.triggerLoading();
        var body = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        });
        return Api.post('register', body)
            .then(this._storeToken)
            .catch(function(error){
                return error.response.json()
                    .then(function(data){
                        this.triggerSignupFailed(data['description']);
                    }.bind(this))
                    .catch(function (exc) {
                        this.triggerSignupFailed(error)
                    }.bind(this));
            }.bind(this))
    },
    FacebookLogin: function(accessToken){
        this.triggerLoading();
        var body = JSON.stringify({accessToken: accessToken});
        return Api.post('facebook-login', body)
            .then(this._storeToken)
    },
    CheckAuthorization: function(){
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
    Logout: function(){
        Api.removeToken();
        this.triggerLogout();
    }
});