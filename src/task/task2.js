const format = require('./task3');
const stockItems = require(`../../inventory.json`);

function getMaxPriceItem(...inventory) {
  const formattedList = format(...inventory);

  formattedList.sort((item1, item2) => (
    item2.quantity * item2.price.replace('$', '') - item1.quantity * item1.price.replace('$', '')
  ));
  return formattedList[0];
}

module.exports = getMaxPriceItem(...stockItems);
