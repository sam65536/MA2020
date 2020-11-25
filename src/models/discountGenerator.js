function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(callback) {
  setTimeout(() => {
    let value = random(1, 99);
    while (value >= 20) value = random(1, 99);
    if (value >= 20) throw new Error('Incorrect value!');
    callback(value);
  }, 50);
}

function getDiscountWrapperCB(type = 1, callback) {
  let total = 1;
  for (let i = 0; i < type; i++) {
    getRandom((result) => {
      // console.log(`Generated number: ${result}`);
      total *= Math.fround((1 - result / 100) * 100) / 100;
      // console.log(`Discount value: ${total}`);
      if (i === type - 1) {
        total = Math.floor((1 - total) * 100);
        // console.log(`Total discount: ${total}%`);
        callback(total);
      }
    });
  }
}

function getDiscountWrapperPromise(type = 1) {
  return new Promise((resolve, reject) => {
    let total = 1;
    for (let i = 0; i < type; i++) {
      getRandom((result) => {
        total *= Math.fround((1 - result / 100) * 100) / 100;
        if (i === type - 1) {
          total = Math.floor((1 - total) * 100);
          resolve(total);
        }
      });
    }
  });
}

module.exports = { getDiscountWrapperCB, getDiscountWrapperPromise };
