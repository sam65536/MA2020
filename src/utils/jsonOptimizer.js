const fs = require('fs');
const path = require('path');
const jsonLines = require('jsonlines');
const { promisify } = require('util');
const { pipeline } = require('stream');


function openJsonInputStream (inputFilePath, response) {

  const fileInputStream = fs.createReadStream(inputFilePath);
  const parser = jsonLines.parse();

  const parseStream = fileInputStream.pipe(parser);
  const stringifier = jsonLines.stringify();

  let jsonArray = [];

  parseStream.on("data", (value) => {
    let flag = false;
    if (jsonArray.length === 0) {
      jsonArray.push(value);
      flag = true;
    } else {
      for (let product of jsonArray) {
        if (equals(value, product)) {
          product.quantity = (Number(product.quantity) + Number(value.quantity)).toString();
          flag = true;
        }
      }
    }
    if (!flag) {
      jsonArray.push(value);
    }
  });

  parseStream.on("end", () => {
    jsonArray.forEach(json => {
      stringifier.write(json);
    })
    response.write('successfully optimized!\n');
    response.end(writeResponse(jsonArray));
  });
  return stringifier;
}

function equals(product1, product2) {
  return (product1.type === product2.type) && (product1.color === product2.color) && (product1.price === product2.price);
}

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

async function optimizeJSON(filename, response) {

  const inputFilePath = path.resolve('./uploads/', filename);
  const outputFilePath = path.resolve('./uploads/optimized/', filename);

  const parseStream = openJsonInputStream(inputFilePath, response);
  const writeStream = fs.createWriteStream(outputFilePath);
  const promisifiedPipeline = promisify(pipeline);

  try {
    await promisifiedPipeline(
      parseStream,
      writeStream);
  } catch (err) {
    console.error('JSON pipeline failed', err);
  }
}

module.exports = {
  optimizeJSON,
}
