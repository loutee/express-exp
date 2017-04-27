var express = require('express');
var router = express.Router();

/* GET new user form. */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

module.exports = router;
