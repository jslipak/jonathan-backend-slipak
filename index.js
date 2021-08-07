const express = require('express');
const fs = require('fs');
const app = express();
const puerto = 8080;
let visitas = { visitas: { items: 0, item: 0 } };
const data = JSON.parse(
  fs.readFileSync('./productos.json', (encoding = 'utf8')),
);

app.get('/api/mensajes', (req, res) => {
  console.log('request recidido');
});

app.get('/items', (req, res) => {
  res.json({ items: data, cantidad: data.length });
  visitas.visitas.items = visitas.visitas.items + 1;
});
app.get('/item-random', (req, res) => {
  res.json(data[Math.floor(Math.random() * data.length)]);
  visitas.visitas.item = visitas.visitas.item + 1;
});
app.get('/visitas', (req, res) => {
  res.json(visitas);
});

const server = app.listen(puerto, () => {
  console.log(`Servidor inicializado en el puerto ${server.address().port}`);
});

server.on('error', (err) => console.log(`Error en servidor ${err}`));
