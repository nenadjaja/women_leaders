var React = require('react'),	
		ReactDOM = require('react-dom');

var PersonItem = React.createClass({
  render: function() {
  	return (
  		<div className="person">
				<img className="profile-img" src="/images/susan.png" alt="susan wojcicki"/>
				<h3>{this.props.name}</h3>
				<p>{this.props.title}</p>
				<div className="clear-both"></div>
			</div>
  	);
  }
});

var PersonList = React.createClass({
	render: function() {
		var dataEntries = this.props.data.map(function(entry) {
			return (
				<PersonItem name={entry.name} title={entry.title}></PersonItem>
			);
		});
		return (
			<div>
				{dataEntries}
			</div>
		);
	}
});

var Person = React.createClass({
	getInitialState: function() {
		return {
			data: [
				{ "name": "Susan Wojcicki", 
					"title": "CEO of YouTube"
				},
				{ "name": "Marissa Mayer",
					"title": "CEO of Yahoo"
				}
			]
		}
	},
	render: function() {
		return (
			<PersonList data={this.state.data} />
		);
	}
})


module.exports = Person;
