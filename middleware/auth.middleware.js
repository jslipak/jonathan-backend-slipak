const auth = function (req, res, next) {
  //if (req.session && req.session.user === 'amy' && req.session.admin) {
  console.log(req.session.user);
  if (req.session.user) {
    return next();
  } else {
    return res.redirect(301, '/');
  }
};

module.exports = auth;
