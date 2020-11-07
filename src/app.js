const { task1: filter, task2: maxCost, task3 } = require('./task');

const stockItems = require('../inventory.json');

function boot(criteria, value, stockItems) {
  const filteredItems = filter(criteria, value, stockItems);
  console.log(filteredItems);
  console.log(task3(filteredItems));
  console.log(maxCost);
}

boot('type', 'socks', stockItems);
