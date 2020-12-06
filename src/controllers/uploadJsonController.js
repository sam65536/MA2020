const { uploadCsv } = require('../utils/csvToJson');
const { optimizeJSON } = require('../utils/jsonOptimizer');
const path = require('path');
const fs = require('fs');

async function uploadJson(request, response) {
  try {
    await uploadCsv(request);
  } catch (err) {
    console.error('CSV pipeline failed', err);

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 500;
    response.end(JSON.stringify({ status: 'error' }));
    return;
  }
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify({ status: 'ok' }));
}

function getFilesList(request, response) {
  response.setHeader('Content-Type', 'application/json');
  return response.end(JSON.stringify(
    fs.readdirSync(path.resolve('./uploads'), { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name)));
}

function optimize(request, response) {
  const filename = path.basename(request.url);
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 202;
  optimizeJSON(filename, response);
}

module.exports = {
  uploadJson, getFilesList, optimize
};

