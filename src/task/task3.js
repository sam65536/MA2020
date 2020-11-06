function formatItemsList(...inventory) {
  const formattedList = [];
  const jsonItems = inventory.map(item => JSON.stringify(item).replace('priceForPair', 'price'));
  jsonItems.forEach(item => formattedList.push(JSON.parse(item)));
  formattedList.forEach(item => item.quantity = item.quantity || 0);
  return formattedList;
}

module.exports = formatItemsList;
