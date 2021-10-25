const { Router } = require('express');
const route = Router();
const Session = require('../services/session.service');
const passport = require('../config/passport.config');
route.get('/login', Session.getLogin);
route.get('/signup', Session.getSignUp);
route.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/api/sessions/login' }),
  Session.passLogin,
);
route.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/api/sessions/login' }),
  Session.createUser,
);
route.get('/logout', (req, res) => {
  const name = req.session.user;
  req.session.destroy((err) => {
    if (!err) {
      res.send(`<h1> Hasta Luego ${name}`);
    } else {
      res.send({ status: 'Logout ERROR', body: err });
    }
  });
});
module.exports = route;
