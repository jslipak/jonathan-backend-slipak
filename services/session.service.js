const passport = require('../config/passport.config');

class Session {
  getLogin(req, res) {
    return res.render('login', { layout: 'login' });
  }
  passLogin(req, res) {
    return res.json({ paso: 'login' });
  }
  getSignUp(req, res) {
    return res.render('signup', { layout: 'signup' });
  }
  createUser(req, res) {
    console.log(req.body);
    res.redirect('/api/prducts');
  }
}

module.exports = new Session();
