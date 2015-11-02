var express = require('express');
var router = express.Router();
var pg = require('pg');
var multer = require('multer');
var upload = multer({ dest: 'public/images' });
var fs = require('fs');

var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/leaders";

router.get('/', function(req,res,next) {
	var results = [];
	pg.connect(connectionString, function(err, client, done) {
		var query = client.query("SELECT * FROM women");

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			client.end();
			res.render('admin/admin', { results: results.reverse() });
		});
	});
});

// Create route
router.post('/form', upload.single('picture'), function(req,res,next) {

	if (req.file)
		img_buffer = fs.readFileSync(req.file.path);
	else 
		img_buffer = '';

	var data = {name: req.body.name, title: req.body.title, image: img_buffer};
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		// insert data
		client.query("INSERT into women(name, title, img) values($1, $2, $3)", 
								[data.name, data.title, data.image], function(err, result){
			if (err) {
				console.log("ERROR SILLY");
				console.log(err);
			}

		});

		// select data
		var query = client.query("SELECT * FROM women");

		// store data into results for presentation
		query.on('row', function(row) {
			row.img = row.img ? row.img.length : '';
			results.push(row);
		});

		query.on('end', function(){
			client.end();
			res.render('admin/admin', { results: results.reverse() });
		});
	});
});

// retrieve image
router.get('/image/:id', function(req, res, next) {
	var id = req.params.id;
	var img = null;
	res.setHeader('Content-Type', 'image/png');
	pg.connect(connectionString, function(err, client, done) {
		var query = client.query('SELECT img FROM women WHERE id=($1)', [id], function(err, result){
			if (err) {
				console.log("ERROR SILLY");
				console.log(err);
			}

		});

		query.on('row', function(row) {
			img = row.img;
		});

		query.on('end', function(data){
			client.end();
			res.send(img);
		});

		if (err) {
			console.log(err);
		}

	});

});


// Delete route
router.get('/delete/:id', function(req, res, next) {
	var results = [];
	// get data from Url params
	var id = req.params.id;

	pg.connect(connectionString, function(err, client, done) {
		// delete data
		client.query("DELETE FROM women WHERE id=($1)", [id], function(err, result){
			if (err) {
				console.log("ERROR SILLY");
				console.log(err);
			}

		});

		// select data
		var query = client.query("SELECT * FROM women ORDER BY id ASC");

		// stream results back one row at a time
		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			client.end();
			return res.json(results);
		});

		if (err) {
			console.log(err);
		}
	});
});

module.exports = router;