const filter = require('./task/index').task1;
const maxCost = require('./task/index').task2;
const task3 = require('./task/index').task3;

const stockItems = require('../inventory.json');

function boot(criteria, value, ...inventory) {
  let filteredItems = filter(criteria, value, ...inventory);
  console.log(filteredItems);
  console.log(task3(...filteredItems));
  console.log(maxCost);
}

function start() {
  boot('type', 'socks', ...stockItems);
}

start();
