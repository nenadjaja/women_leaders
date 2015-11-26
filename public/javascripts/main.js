var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./components/app');

$(function() {
  ReactDOM.render(<Hello url='api/data'/>, document.getElementById('react-test'));
});

