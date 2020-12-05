const fs = require('fs');
const path = require('path');

const through2 = require('through2');
const split = require('split2');

const { writeResponse } = require('./toolkit/writeOptimizeResponse');

const transformStream = () => {
  const resultList = [];
  return through2.obj( (data, enc, cb) => {
      let flag = false;
      let value = JSON.parse(data);
      if (resultList.length === 0) {
        resultList.push(value);
        flag = true;
      } else {
        for (let product of resultList) {
          if (equals(product, value)) {
            product.quantity = (Number(value.quantity) + Number(product.quantity)).toString();
            flag = true;
          }
        }
      }
      if (!flag) resultList.push(value);
      cb(null, null);
    },
    function(cb) {
        this.push(JSON.stringify(resultList, null, 4));
        console.log(writeResponse(resultList));
      cb();
    });
};

function optimizeJSON(filename) {

  const inputFilePath = path.resolve('./uploads/', filename);
  const outputFilePath = path.resolve('./uploads/optimized/', filename);

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);

  readStream
    .pipe(split())
    .pipe(transformStream)
    .pipe(writeStream)
}

function equals(product1, product2) {
  return (product1.type === product2.type) && (product1.color === product2.color) && (product1.price === product2.price);
}

module.exports = {
  transformStream,
  optimizeJSON,
}

// optimizeJSON('7b62cdec-6a81-43a8-917e-b5698baf531b.json');
