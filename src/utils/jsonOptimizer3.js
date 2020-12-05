const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');
const jsonLines = require('jsonlines');
const { writeResponse } = require('./toolkit/writeOptimizeResponse');
const { promisify } = require('util');
const { pipeline } = require('stream');


function openJsonInputStream (inputFilePath) {

  const fileInputStream = fs.createReadStream(inputFilePath);
  const parser = jsonLines.parse();
  const parseStream = fileInputStream.pipe(parser);

  let jsonArray = [];
  let flag = false;
  let currentValue = null;
  let count = 0;

  parser.on("data", (value) => {
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

  parser.on("end", () => {
    parser.push(jsonArray);
    console.log(jsonArray);
    // response.end(writeResponse(jsonArray));
    // parser.end(); // Signify end of stream.
  });
  return parseStream;
}

function equals(product1, product2) {
  return (product1.type === product2.type) && (product1.color === product2.color) && (product1.price === product2.price);
}

async function optimizeJSON(filename) {

  // const parser = jsonLines.parse();

const stringifier = jsonLines.stringify();

  const inputFilePath = path.resolve('../../uploads/', filename);
  const outputFilePath = path.resolve('../../uploads/optimized/', filename);
  const parseStream = openJsonInputStream(inputFilePath);


  // const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const promisifiedPipeline = promisify(pipeline);

  try {
    await promisifiedPipeline(
      parseStream,
      stringifier,
      writeStream);
  } catch (err) {
    console.error('CSV pipeline failed', err);
  }

  //
  // readStream
  //   .pipe(parser)
  //   .pipe(stringifier)
  //   .pipe(writeStream)

}



module.exports = {
  optimizeJSON,
}

optimizeJSON('08324c88-f6cd-407c-b839-43e186187fde.json');
