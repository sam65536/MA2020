const Product = require('../models/productModel');

const products = require('../../inventory.json');

function getAllProductsDiscountsCB(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Product.getAllDiscountsCB(products, (body, err) => {
    if (err) throw new Error(err);
    res.end(JSON.stringify(body));
  });
}

function getAllProductsDiscountsPromise(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Product.getAllDiscountsPromise(products)
    .then((body) => {
      res.end(JSON.stringify(body));
    })
    .catch((err) => console.error(err));
}

async function getAllProductsDiscountsAsync(req, res) {
  try {
    const body = await Product.getAllDiscountsPromise(products);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(body));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllProductsDiscountsCB,
  getAllProductsDiscountsPromise,
  getAllProductsDiscountsAsync,
};
