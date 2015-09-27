var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
	res.render('admin');
});

router.post('/form', function(req,res,next){
	res.send('You added: ' + req.body.name +', '+req.body.title+', '+req.body.img);
});

module.exports = router;