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
    authorizedGet(url){
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
    authorizedPost(url, data){
        return fetch(rootUrl + url, {
            method: 'post',
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
    authorizedDelete(url){
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