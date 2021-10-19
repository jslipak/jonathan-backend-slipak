const auth = function (req, res, next) {
  console.log('console.log --> Session:', req.session);
  console.log('try', req.session.cookie.expires);
  if (req.session.user !== 'Joana') {
    req.session.destroy();
    console.log('paso por aca');
    return res.redirect(301, '/');
  }

  return next();
};
module.exports = auth;
