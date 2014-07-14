var express = require('express');
var router = express.Router();

var Model = require('../models/Model.js');

/* GET home page. */
router.get('/', function(req, res) {
    //res.render('index', { title: 'Express' });
    res.sendfile('./app/views/index.html');
});

router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    var path = req.url;
    res.sendfile('./app/views/partials/' + name);
});





module.exports = router;