var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var Header = require('./components/header');
var options = {};


var element = React.createElement(Header, options);
ReactDOM.render(element, document.querySelector('.main-container'));