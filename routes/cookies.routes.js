const { Router } = require('express');
//const Cookie = require('../services/cookie.service');
const route = Router();

route.get('/set', (req, res) => {
  res.cookie('server', 'exress').send('Cookie Set');
});

route.get('/setEx', (req, res) => {
  res.cookie('server2', 'express2', { maxAge: 30000 }).send('Cookie SetEx');
});
route.get('/get', (req, res) => {
  //res.send(req.cookies.server);
  res.send(req.cookies.server2);
});
route.get('/clr', (req, res) => {
  res.clearCookie('server').send('Cookie Clear');
});

module.exports = route;
