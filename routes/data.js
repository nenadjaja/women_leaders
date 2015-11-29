var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/leaders";

router.get('/', function(req,res,next) {
	var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("SELECT name, title, id FROM women");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      res.end(JSON.stringify(results.reverse(), null, 2));
    });
  });
});

module.exports = router;