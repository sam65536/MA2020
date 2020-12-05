function writeResponse(productList) {
  const result = {};
  let product = JSON.parse(productList[0]);
  let key = product.type;
  result[key] = product.quantity;
  for (let i=1; i<productList.length; i++) {
    product = JSON.parse(productList[i]);
    key = product.type;
    if (result[key]) {
      result[key] = Number(result[key]) + Number(product.quantity);
    }
    else {
      result[key] = Number(product.quantity);
    }
  }
  return JSON.stringify(result, null, 4);
}

module.exports = {
  writeResponse,
}
