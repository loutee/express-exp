var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    age: {type: Number}
});

var User = mongoose.model('User', userSchema);

/* GET new user form. */
router.get('/new', function(req, res) {
  res.render('users/new');
});

/* POST new user form. */
router.post('/new', function(req, res) {
  var userInfo = req.body;
  if(!userInfo.name || !userInfo.age) {
    res.render('users/show_message', {message: "Field is blank", type: "error"});
  } else {
    var newUser = new User({
      name: userInfo.name,
      age: userInfo.name
    });

    newUser.save(function(err, User){
      if(err) {
        res.render('users/show_message', {message: "Database error", type: "error"});
        console.log(err);
      } else {
        res.render('users/show_message', {message: "New user added", type: "success", user: userInfo});
      }
    });
  }
});

module.exports = router;
