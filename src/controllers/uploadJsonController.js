const { uploadCsv } = require('../utils/csv-to-json');

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
  return;
}

module.exports = {
  uploadJson,
};
