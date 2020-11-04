function filterItems(criteria, value, ...goodsArr) {
  return goodsArr.filter((item) => item.hasOwnProperty(criteria) && item[criteria] === value);
}

module.exports = filterItems;
