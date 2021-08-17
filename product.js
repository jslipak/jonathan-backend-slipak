let visitas = { visitas: { items: 0, item: 0 } };
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./productos.json', (encoding = 'utf8')),
);

class Producto {
  create(req, res) {
    const insertData = req.body;
    insertData.id = data.length;
    data.push(insertData);
    return res.json({ producto: 'Producto creado' });
  }
  getAll(_req, res) {
    res.json({ items: data, cantidad: data.length });
    visitas.visitas.items = visitas.visitas.items + 1;
  }
  findOneById(req, res) {
    let id = req.params.id;
    let text = data.find((val) => id == val.id);
    return res.json(text ? text : { error: 'Producto no encontrado' });
  }
  deleteOneById(req, res) {
    let id = req.params.id;
    if (id <= data.length) {
      data.splice(id, 1);
      return res.json({ response: 'Producto Eliminado' });
    } else {
      return res.json({ error: 'Producto no encontrado' });
    }
  }
  updateOneById(req, res) {
    let id = req.params.id;
    data[id] = req.body;
    return res.json({ producto: 'Producto Actualizado' });
  }
  random(_req, res) {
    res.json(data[Math.floor(Math.random() * data.length)]);
    visitas.visitas.item = visitas.visitas.item + 1;
  }
  visitas(_req, res) {
    res.json(visitas);
  }
}

module.exports = new Producto();
