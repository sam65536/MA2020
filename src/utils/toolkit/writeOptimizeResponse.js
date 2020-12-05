function writeResponse(productList) {
  const result = {};
  let key = productList[0].type;
  result[key] = productList[0].quantity;
  for (let i=1; i<productList.length; i++) {
    key = productList[i].type;
    if (result[key]) {
      result[key] = Number(result[key]) + Number(productList[i].quantity);
    }
    else {
      result[key] = Number(productList[i].quantity);
    }
  }
  return JSON.stringify(result, null, 4);
}

module.exports = {
  writeResponse,
}
