const { Transform, pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { csv } = require('csvtojson');
const { v4: uuidv4 } = require('uuid');

const { promisify } = require('util');
const fs = require('fs');

const promisifiedPipeline = promisify(pipeline);

const createCsvToJson = csv().fromStream(
  new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString());
    },
    flush(callback) {
      console.log('No more data to read');
      callback(null, '');
    },
  }),
);

async function uploadCsv(inputStream) {
  const gunzip = createGunzip();
  const filepath = `./upload/${uuidv4()}.json`;
  const outputStream = fs.createWriteStream(filepath);

  try {
    await promisifiedPipeline(inputStream, gunzip, createCsvToJson, outputStream);
  } catch (err) {
    console.error('CSV pipeline failed', err);
  }
}

module.exports = {
  uploadCsv,
};
