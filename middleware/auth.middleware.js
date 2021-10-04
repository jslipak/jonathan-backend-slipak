const auth = function (req, res, next) {
  const body = req.body;
  console.log(req.body);
  if (body.user === 'admin') {
    delete body.user;
    next();
  } else {
    res.status(400).send('No autorizado');
  }
};

module.exports = auth;
