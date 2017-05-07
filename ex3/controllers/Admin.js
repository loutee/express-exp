var BaseController = require("./Base");
var View = require("../views/Base");
var v;
module.exports = BaseController.extend({
  name: "Admin",
  run: function(req, res, next) {
    var self = this;
    if(this.authorization(req)) {
      model.setDB(req.db);
      req.session.expapp = true;
      req.session.save();
      v = new View(res, 'admin');
      self.del(req, function() {
        self.form(req, res, function(formMarkup) {
          self.list(function(listMarkup) {
            v.render({
              title: 'Administration',
              content: 'Welcome to the control panel',
              list: listMarkup,
              form: formMarkup
            });
          });
        });
      });
    } else {
      v = new View(res, 'admin-login');
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
  },
  handleFileUpload: function(req) {
	if(!req.files || !req.files.picture || !req.files.picture.name) {
        return req.body.currentPicture || '';
    }
    var data = fs.readFileSync(req.files.picture.path);
    var fileName = req.files.picture.name;
    var uid = crypto.randomBytes(10).toString('hex');
    var dir = __dirname + "/../public/uploads/" + uid;
    fs.mkdirSync(dir, '0777');
    fs.writeFileSync(dir + "/" + fileName, data);
    return '/uploads/' + uid + "/" + fileName;
  }
});


