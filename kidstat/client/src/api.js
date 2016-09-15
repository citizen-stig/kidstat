import 'whatwg-fetch';
const rootUrl = '/api/v1/';
const tokenName = 'accessToken';

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
};

export const get = ({url}) => {
    return fetch(rootUrl + url)
        .then(checkStatus)
        .then(response => response.json())
};

export const post = ({url, body}) => {
    return fetch(rootUrl + url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(checkStatus).then(response => response.json());
};
