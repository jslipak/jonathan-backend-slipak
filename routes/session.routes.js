const { Router } = require('express');
const route = Router();
const Session = require('../services/session.service');
const passport = require('../config/passport.config');
route.get('/facebook', passport.authenticate('facebook'));
route.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/productos/',
    failureRedirect: '/',
  }),
);
route.get('/login', Session.getLogin);
route.get('/signup', Session.getSignUp);
route.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/api/sessions/login' }),
  Session.passLogin,
);
route.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/api/' }),
  Session.createUser,
);
route.get('/logout', Session.logout);
module.exports = route;
