const auth = function (req, res, next) {
  console.log(req.body);
  const body = req.body;
  if (body.user === 'admin') {
    delete body.user;
    next();
  } else {
    res.status(400).send('No autorizado');
  }
};

module.exports = auth;
