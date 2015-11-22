var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./components/app');

$(function() {
 	ReactDOM.render(<Hello />, document.getElementById('react-test'));
});

