var express = require('express');
var router = express.Router();
var pg = require('pg');
var multer = require('multer');
var upload = multer({ dest: 'public/images' });
var fs = require('fs');

var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/leaders";

router.get('/', function(req,res,next) {
	res.render('admin', { results: null});
});

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
			res.render('admin', { results: JSON.stringify(results.reverse(), null, 2) });
		});
	})
});

module.exports = router;