Array.prototype.myMap = function (callback) {
  const result = [];
  this.forEach((elem) => result.push(callback(elem)));
  return result;
};

module.exports = Array.prototype.myMap;
