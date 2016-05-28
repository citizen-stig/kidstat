var React = require('react');
var ReactDOM = require('react-dom');
var Kidstat = require('./components/kidstat.jsx');
var options = {};


var element = React.createElement(Kidstat, options);

ReactDOM.render(element,
    document.querySelector('.main-container'));
