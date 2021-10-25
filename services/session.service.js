const passport = require('../config/passport.config');

class Session {
  getLogin(req, res) {
    return res.render('login', { layout: 'login' });
  }
  passLogin(req, res) {
    return res.redirect('/api/productos');
  }
  getSignUp(req, res) {
    return res.render('signup', { layout: 'signup' });
  }
  createUser(req, res) {
    console.log(req.body);
    res.redirect('/api/productos/');
  }
  logout(req, res) {
    const name = req.user.username;
    req.session.destroy((err) => {
      if (!err) {
        res.redirect('/');
      } else {
        res.send({ status: 'Logout ERROR', body: err });
      }
    });
  }
}

module.exports = new Session();
