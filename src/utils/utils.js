const fs = require('fs');
const path = require('path');

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        body = Buffer.concat(body).toString();
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function writeToFile(content) {
  return new Promise((resolve) => {
    let data = require('../../inventory.json');
    data.splice(0, data.length);
    content.forEach((item) => {
      data.push(item);
    });
    fs.writeFileSync(
      path.resolve('../', 'inventory.json'),
      JSON.stringify(data, null, 4),
      'utf8',
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
    resolve(data);
  });
}

module.exports = { getPostData, writeToFile };
