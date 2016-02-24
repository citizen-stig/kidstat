var Fetch = require('whatwg-fetch');
var rootUrl = '/api/v1/';
var tokenName = 'accessToken';

module.exports = {
    storeToken(token){
        localStorage.setItem(tokenName, token);
    },
    getToken(){
        return localStorage.getItem(tokenName);
    },
    removeToken(){
        localStorage.removeItem(tokenName);
    },
    post(url, body){
        console.log("Posting from api.jsx");
        return fetch(rootUrl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(function (response) {
            return response.json()
        });
    },
    authorizedGet(url){
        return fetch(rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            }
        }).then(function (response) {
            return response.json()
        });
    }
};