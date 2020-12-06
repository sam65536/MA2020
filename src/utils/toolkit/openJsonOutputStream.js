const fs = require('fs');
const { Writable } = require('stream');

function openJsonOutputStream(fileOutputPath) {
  const fileOutputStream = fs.createWriteStream(fileOutputPath);

  let numRecords = 0;

  const jsonOutputStream = new Writable({ objectMode: true });
  jsonOutputStream._write = (chunk, encoding, callback) => {
    if (numRecords > 0) {
      fileOutputStream.write("\n");
    } else {
      // fileOutputStream.write("[");
    }

    // Output a single row of a JSON array.
    const jsonData = JSON.stringify(chunk);
    fileOutputStream.write(jsonData);
    ++numRecords;
    callback();
  };

  jsonOutputStream.on("finish", () => {
    // fileOutputStream.write("]");
    fileOutputStream.end();
  });

  return jsonOutputStream;
}

module.exports = {
  openJsonOutputStream,
}
