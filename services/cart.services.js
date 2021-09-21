const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./ordens.json', (encoding = 'utf8')));
const product = JSON.parse(
  fs.readFileSync('./productos.json', (encoding = 'utf8')),
);

class Carrito {
  getAll(req, res) {
    res.json({ ordenes: data, numero_de_ordenes: data.length });
  }
  findOneById(req, res) {
    let id = req.params.id;
    let text = data.filter((item) => item).find((val) => id == val.id);
    return res.json(text ? text : { error: 'Producto no encontrado' });
  }
  async create(req, res) {
    const insertData = {};
    const productData = [];
    const array = req.body;
    array.forEach((item) => {
      console.log(item);
      const addProduct = product.find((x) => x.id == item.id);
      addProduct.cantidad = item.cantidad;
      productData.push(addProduct);
    });
    insertData.id = data.length;
    insertData.timestamp = Date.now();
    insertData.product = productData;
    data.push(insertData);
    await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
    return res.json({ producto: 'Orden creado' });
  }

  async deleteOneById(req, res) {
    let id = req.params.id;
    if (id <= data.length) {
      //data.splice(id + 1, 1); --> si borro la posicion tendria problemas con el id
      data[id] = {};
      await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
      return res.json({ response: 'Orden Eliminado' });
    } else {
      return res.json({ error: 'Orden no encontrado' });
    }
  }

  async insertProductById(req, res) {
    const id = req.params.id;
    const insert = req.body;
    data[id].product.push(insert);
    await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
    return res.json({ producto: 'agregada' });
  }
}

module.exports = new Carrito();
