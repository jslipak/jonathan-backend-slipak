const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./ordens.json', (encoding = 'utf8')));
const products = JSON.parse(
  fs.readFileSync('./productos.json', (encoding = 'utf8')),
);

class Carrito {
  getAll(req, res) {
    res.json({
      ordenes: data,
      numero_de_ordenes: data.length,
    });
  }
  findOneById(req, res) {
    let { id } = req.params;
    let text = data.filter((item) => item).find((val) => id == val.id);
    return res.json(
      text
        ? text
        : {
            error: 'Producto no encontrado',
          },
    );
  }
  async create(req, res) {
    const product = req.body.map(({ id, cantidad }) => ({
      ...products.find((x) => x.id == id),
      cantidad,
    }));
    const insertData = {
      id: data.length,
      timestamp: Date.now(),
      product,
    };
    data.push(insertData);
    await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
    return res.json({
      producto: 'Orden creado',
    });
  }

  async deleteOneById(req, res) {
    let id = req.params.id;
    if (id <= data.length) {
      //data.splice(id + 1, 1); --> si borro la posicion tendria problemas con el id
      data[id] = {};
      await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
      return res.json({
        response: 'Orden Eliminado',
      });
    } else {
      return res.json({
        error: 'Orden no encontrado',
      });
    }
  }

  async insertProductById(req, res) {
    const id = req.params.id;
    const insert = req.body;
    data[id].product.push(insert);
    await fs.promises.writeFile('./ordens.json', JSON.stringify(data));
    return res.json({
      producto: 'agregada',
    });
  }
}

module.exports = new Carrito();
