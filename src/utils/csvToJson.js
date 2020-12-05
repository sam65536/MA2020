const path = require('path');
const { Transform, pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { promisify } = require('util');
const papaparse = require('papaparse');
const { openJsonOutputStream } = require('./toolkit/openJsonOutputStream')

const { v4: uuid } = require('uuid');

function openCsvTransformStream(inputStream) {

  const csvTransformStream = new Transform({ objectMode: true });
  csvTransformStream._transform = (inputChunk, encoding, callback) => {
    callback();
  }

  let currentObject = {};
  papaparse.parse(inputStream, {
    header: true,
    skipEmptyLines: true,

    transform(value, field) {
      if (currentObject[field] === undefined) {
        currentObject[field] = value;
      } else {
        csvTransformStream.push(currentObject);
        currentObject = {};
        currentObject[field] = value;
      }
    },

    complete: () => {
      csvTransformStream.push(currentObject);
      csvTransformStream.push(null);
    },

    error: (err) => {
      csvTransformStream.emit("error", err);
    }
  });
  return csvTransformStream;
}

async function uploadCsv(inputStream) {
  const fileOutputPath = path.resolve('./uploads/', `${uuid()}.json`);
  const gunzip = createGunzip();
  const csvTransformStream = openCsvTransformStream(gunzip);
  const outputStream = openJsonOutputStream(fileOutputPath);
  const promisifiedPipeline = promisify(pipeline);

  try {
    await promisifiedPipeline(
      inputStream,
      gunzip,
      csvTransformStream,
      outputStream);
  } catch (err) {
    console.error('CSV pipeline failed', err);
  }
}

module.exports = {
  uploadCsv,
};
