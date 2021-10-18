const { Router } = require('express');
const route = Router();

route.get('/con-session', (req, res) => {
  if (req.session.contador) {
    req.session.contador++ |
      res.send(`Ud. ha visitado el sitio ${req.session.contador} veces.`);
  } else {
    req.session.contador = 1;
    res.send('Bienvenido!');
  }
});

route.post('/login', (req, res) => {
  console.log(req.body);
  console.log(req.session);
  if (!req.session.user) {
    req.session.user = req.body.user;
    req.session.password = req.body.password;
    req.session.cookie.maxAge = 1000 * 60;
    res.redirect('/api/productos');
  }
});
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
