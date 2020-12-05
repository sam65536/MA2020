const bfj = require('bfj');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const { openJsonOutputStream } = require('./toolkit/openJsonOutputStream')
const { writeResponse } = require('./toolkit/writeOptimizeResponse');

function openJsonInputStream (inputFilePath, response) {

  const jsonInputStream = new stream.Readable({ objectMode: true });
  jsonInputStream._read = () => {};

  const fileInputStream = fs.createReadStream(inputFilePath);

  let currentObject = null;
  let currentProperty = null;
  // let buffer = null;
  const jsonArray = [];

  const emitter = bfj.walk(fileInputStream);

  emitter.on(bfj.events.object, () => {
    currentObject = {};
  });

  emitter.on(bfj.events.property, name => {
    currentProperty = name;
  });

  let onValue = value => {
    currentObject[currentProperty] = value;
    currentProperty = null;
  };

  emitter.on(bfj.events.string, onValue);
  emitter.on(bfj.events.number, onValue);
  emitter.on(bfj.events.literal, onValue);

  emitter.on(bfj.events.endObject, () => {
    let flag = false;

    if (jsonArray.length === 0) {
      // buffer = Buffer.from(JSON.stringify(currentObject));
      jsonArray.push(currentObject);
      flag = true;
    } else {
        for (let product of jsonArray) {
          // let currentProduct = JSON.parse(product);
          // console.log(currentObject);
          if (equals(currentObject, product)) {
            product.quantity = (Number(product.quantity) + Number(currentObject.quantity)).toString();
            // console.log(currentProduct);
            // product = Buffer.from(JSON.stringify(currentProduct));
            // console.log(product.toString());
            // product = JSON.stringify(currentProduct);
            flag = true;
        }
      }
    }
    if (!flag) {
      // buffer = Buffer.from(JSON.stringify(currentObject));
      jsonArray.push(currentObject);
    }

    currentObject = null;
  });

  emitter.on(bfj.events.endArray, () => {
    jsonArray.forEach(json => jsonInputStream.push(json));
    console.log(jsonArray);
    response.end(writeResponse(jsonArray));
    jsonInputStream.push(null); // Signify end of stream.
  });

  emitter.on(bfj.events.error, err => {
    jsonInputStream.emit("error", err);
  });

  return jsonInputStream;
}

function equals(product1, product2) {
  return (product1.type === product2.type) && (product1.color === product2.color) && (product1.price === product2.price);
}

function optimizeJSON(filename, response) {

  const inputFilePath = path.resolve('./uploads/', filename);
  const outputFilePath = path.resolve('./uploads/optimized/', filename);

  const readStream = openJsonInputStream(inputFilePath, response);
  const writeStream = openJsonOutputStream(outputFilePath);

  readStream.pipe(writeStream);
}

module.exports = {
  optimizeJSON,
}
// optimizeJSON('2ff6a5ff-b50b-4773-90ed-bcc57f12a7b6.json');
