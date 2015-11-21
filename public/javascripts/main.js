var React = require('react');
var ReactDOM = require('react-dom');

$(function() {
 
 var Hello = React.createClass({
 	render: function() {
 		return (<div>Hello world</div>);
 	}
 });
 ReactDOM.render(<Hello />, document.getElementById('react-test'));
});

