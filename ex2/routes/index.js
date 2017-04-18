var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Experimental Express App' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Experimental Express App' });
});

router.get('/help', function(req, res, next) {
 res.render('help', { title: 'Experimental Express App' });
})

router.get('/contact', function(req, res, next) {
 res.render('contact', { title: 'Experimental Express App' });
})

module.exports = router;
