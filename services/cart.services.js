class Carrito {
  getAll(req, res) {
    console.log(req);
    res.json('test');
  }
  findOneById(req, res) {
    console.log(req);
    res.json('test');
  }
  addProductCart(req, res) {
    console.log(req);
    res.json('test');
  }
  deleteProductCart(req, res) {
    console.log(req);
    res.json('test');
  }
}

module.exports = new Carrito();
