function formatItemsList(...inventory) {
  let formattedList = [];

  for (let i = 0; i < inventory.length; i++) {
    formattedList[i] = inventory[i].hasOwnProperty('priceForPair')
      ? {
          type: inventory[i].type,
          color: inventory[i].color,
          quantity: inventory[i].quantity,
          price: inventory[i].priceForPair,
        }
      : inventory[i];
  }
  formattedList.forEach((item) => {
    if (item.quantity === undefined) {
      item.quantity = 0;
    }
  });

  return formattedList;
}

module.exports = formatItemsList;
