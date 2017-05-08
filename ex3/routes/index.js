var express = require('express');
var router = express.Router();
var Admin = require('../controllers/Admin');

var attachDB = function(req, res, next) {
  req.db = db;
  next();
};

router.all('/admin*', attachDB, function(req, res, next) {
  Admin.run(req, res, next);
});

router.all('/blog/:id', attachDB, function(req, res, next) {
	Blog.runArticle(req, res, next);
});
router.all('/blog', attachDB, function(req, res, next) {
	Blog.run(req, res, next);
});

router.all('/services', attachDB, function(req, res, next) {
	Page.run('services', req, res, next);
});
router.all('/careers', attachDB, function(req, res, next) {
	Page.run('careers', req, res, next);
});
router.all('/contacts', attachDB, function(req, res, next) {
	Page.run('contacts', req, res, next);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
