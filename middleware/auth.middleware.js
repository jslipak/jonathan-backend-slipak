const auth = function (req, res, next) {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = auth;
