var BaseController = require("./Base"),
    View = require("../views/Base");
module.exports = BaseController.extend({
  name: "Admin",
  run: function(req, res, next) {
    if(this.authorization(req)) {
      req.session.expapp = true;
      req.session.save(function(err) {
        var v = new View(res, 'admin');
        v.render({
          title: 'Administration',
          content: 'Welcome to the control panel'
        });
      });
    } else {
      var v = new View(res, 'admin-login');
      v.render({
        title: 'Please login'
      });
    }
  },
  authorize: function(req) {
    return (
      req.session &&
      req.session.expapp &&
      req.session.expapp === true
    ) || (
      req.body &&
      req.body.username === this.username &&
      req.body.password === this.password
    );
  }
});


