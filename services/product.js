let visitas = { visitas: { items: 0, item: 0 } };
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./productos.json', (encoding = 'utf8')),
);

class Producto {
  async create(req, res) {
    const insertData = req.body;
    insertData.id = data.length;
    data.push(insertData);
    await fs.promises.writeFile('./productos.json', JSON.stringify(data));
    //return res.json({ producto: 'Producto creado' });
    return res.redirect('/api/productos/new');
  }
   async createIO(obj) {
    const insertData = obj
    insertData.id = data.length;
    data.push(insertData);
    await fs.promises.writeFile('./productos.json', JSON.stringify(data));
    //return res.json({ producto: 'Producto creado' });
    return console.log("se agrego un producto");
  }
  
  getAll(_req, res) {
    visitas.visitas.items = visitas.visitas.items + 1;
    //res.json({ items: data, cantidad: data.length });
    const dataFilter = data.filter((val) => Object.keys(val).length);
    res.render('index', { products: dataFilter });
  }
  findOneById(req, res) {
    let id = req.params.id;
    let text = data.find((val) => id == val.id);
    return res.json(text ? text : { error: 'Producto no encontrado' });
  }
  async deleteOneById(req, res) {
    let id = req.params.id;
    if (id <= data.length) {
      //data.splice(id + 1, 1); --> si borro la posicion tendria problemas con el id
      data[id] = {};
      await fs.promises.writeFile('./productos.json', JSON.stringify(data));
      return res.json({ response: 'Producto Eliminado' });
    } else {
      return res.json({ error: 'Producto no encontrado' });
    }
  }
  async updateOneById(req, res) {
    let id = parseInt(req.params.id);
    console.log(req);
    if (id <= data.length) {
      data[id] = req.body;
      data[id].id = id;
      console.log('esto es data:', data.length, 'este es el id:', id);
      await fs.promises.writeFile('./productos.json', JSON.stringify(data));
      return res.json({ producto: 'Producto Actualizado' });
    } else {
      return res.json({ error: 'Producto no encontrado' });
    }
  }
  getDataId(id) {
    return data[id];
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
