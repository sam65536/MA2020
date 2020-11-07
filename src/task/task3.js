function formatItemsList(inventory) {
  return inventory.map((item) => {
    return {
      type: item.type,
      color: item.color,
      quantity: item.quantity || 0,
      price: item.price || item.priceForPair,
    };
  });
}

module.exports = formatItemsList;
