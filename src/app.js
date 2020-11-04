const filter = require('./task/index').task1;
const maxCost = require('./task/index').task2;
const task3 = require('./task/index').task3;

const stockItems = require('../inventory.json');

console.log(filter('type', 'socks', ...stockItems));
console.log(maxCost);
console.log(task3(...stockItems));
