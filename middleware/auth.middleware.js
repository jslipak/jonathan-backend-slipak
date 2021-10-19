const auth = function (req, res, next) {
  console.log('console.log --> Session:', req.session);
  console.log('try', req.session.cookie.expires);
  if (!req.session.user) {
    return res.redirect(301, '/');
  }

  if (parseInt(Date.now() + 10000) > req.session.cookie.expires) {
    console.log('estoy aca');
    console.log('maxAge origal:', req.session.cookie.originalMaxAge);
    req.session.destroy();
    return res.redirect('/');
  }

  req.session.cookie.maxAge = Date.now() + 10 * 1000;
  return next();
};
module.exports = auth;
