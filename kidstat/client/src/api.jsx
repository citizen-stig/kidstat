var Fetch = require('whatwg-fetch');
var rootUrl = '/api/v1/';
var tokenName = 'accessToken';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

module.exports = {
    storeToken: function(token){
        localStorage.setItem(tokenName, token);
    },
    getToken: function(){
        return localStorage.getItem(tokenName);
    },
    removeToken: function(){
        localStorage.removeItem(tokenName);
    },
    post: function(url, body){
        console.log("Just POST!!!");
        console.log(body);
        return fetch(rootUrl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    authorizedGet: function(url){
        return fetch(rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            }
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    sendDataToSever: function(url, data, method){
        return fetch(rootUrl + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            },
            body: JSON.stringify(data)
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    authorizedPost: function(url, data){
        return this.sendDataToSever(url, data, 'post');
    },
    authorizedPut: function(url, data){
        return this.sendDataToSever(url, data, 'put');
    },
    authorizedDelete: function(url){
       return fetch(rootUrl + url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            }
        })
            .then(checkStatus)
            .then(parseJSON);
    }
};