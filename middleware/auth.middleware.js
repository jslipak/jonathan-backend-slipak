const auth = function (req, res, next) {
  console.log(req.session.user);
  if (!req.session.user) {
    return res.redirect(301, '/');
  }

  req.session.cookie.maxAge = Date.now() + 1000 * 60;
  return next();
};
module.exports = auth;
