require('./custommap');

const {
  getDiscountWrapperCB: getDiscountCB,
  getDiscountWrapperPromise: getDiscountPromise,
} = require('./discountGenerator');

function getDiscountType(product) {
  let discountType = 1;
  if (product.type === 'hat') discountType++;
  if (product.type === 'hat' && product.color === 'red') discountType++;
  return discountType;
}

function formatProductWithDiscount(product, discount) {
  return {
    type: product.type,
    color: product.color,
    quantity: product.quantity || 0,
    price: product.price || product.priceForPair,
    discount: discount + '%',
  };
}

function getAllDiscountsCB(store, callback) {
  const updatedStore = [];
  store.myMap((product) => {
    getDiscountCB(getDiscountType(product.type), (discount) => {
      product = formatProductWithDiscount(product, discount);
      updatedStore.push(product);
      if (updatedStore.length === store.length) {
        callback(updatedStore);
      }
    });
  });
}

function getAllDiscountsPromise(store) {
  const updatedStore = [];
  return new Promise((resolve) => {
    store.myMap((product) => {
      let discountType = getDiscountType(product);
      getDiscountPromise(discountType).then((discount) => {
        product = formatProductWithDiscount(product, discount);
        updatedStore.push(product);
        if (updatedStore.length === store.length) {
          resolve(updatedStore);
        }
      });
    });
  });
}

module.exports = { getAllDiscountsCB, getAllDiscountsPromise };
