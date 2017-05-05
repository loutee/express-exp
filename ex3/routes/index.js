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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
