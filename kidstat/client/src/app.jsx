var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var options = {};

var Button = ReactBootstrap.Button;

var Badge = React.createClass({
  render: function() {
    return <Button bsStyle="primary">This is my first button</Button>
  }
});


var element = React.createElement(Badge, options);
React.render(element, document.querySelector('.main-container'));