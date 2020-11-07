function formatItemsList(inventory) {
  const formattedList = inventory.map((item) => {
    return {
      type: item.type,
      color: item.color,
      quantity: item.quantity || 0,
      price: item.price || item.priceForPair,
    };
  });
  return formattedList;
}

module.exports = formatItemsList;
