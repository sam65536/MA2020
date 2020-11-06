function filterItems(criteria, value, ...inventory) {
  return inventory.filter(item => item.hasOwnProperty(criteria) && item[criteria] === value);
}

module.exports = filterItems;
