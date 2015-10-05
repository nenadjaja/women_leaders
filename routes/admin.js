var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/leaders";

router.get('/', function(req,res,next) {
	res.render('admin', { results: null});
});

router.post('/form', function(req,res,next){
	var data = {name: req.body.name, title: req.body.title};
	console.log(data);
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		// insert data
		client.query("INSERT into women(name, title) values($1, $2)", [data.name, data.title]);
	
		// select data
		var query = client.query("SELECT * FROM women");

		// store data into results for presentation
		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function(){
			client.end();
			res.render('admin', { results: JSON.stringify(results.reverse(), null, 2) });
		});
	})
});

module.exports = router;