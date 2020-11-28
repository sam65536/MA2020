const storeController = require('./storeController');
const discountController = require('./discountController');
const uploadJsonController = require('./uploadJsonController');

module.exports = {
  store: storeController,
  discount: discountController,
  uploadJson: uploadJsonController,
};
