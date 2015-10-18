var pg = require('pg');
var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/leaders";

// create a new postgres client and connect to it
var client = new pg.Client(connectionString);
client.connect();

// create a new table in the database leaders
// var createQuery = client.query('CREATE TABLE women(id SERIAL PRIMARY KEY, name VARCHAR(30) not null, title VARCHAR(30), img TEXT)');
// createQuery.on('end', function() {
// 	client.end();
// });

// reject duplicate name and title combinations
var createQuery = client.query('CREATE unique index on women(name, title)');

createQuery.on('end', function() {
	client.end();
});