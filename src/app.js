require('env2')('./.env.example');
const http = require('http');
const actions = require('./controllers');

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url.match(/\/api\/products\/filter/) && req.method === 'GET')
    return actions.store.getFilteredBy(req, res);
  if (req.url === '/api/products/maxCost' && req.method === 'GET')
    return actions.store.getMaxCost(req, res);
  if (req.url === '/api/products/json' && req.method === 'GET')
    return actions.store.getJson(req, res);
  if (req.url === '/api/products/addStore' && req.method === 'POST')
    return actions.store.createStore(req, res);
  if (req.url === '/api/products/updateStore' && req.method === 'POST')
    return actions.store.updateStore(req, res);
  if (req.url === '/api/products/showDiscount/cb' && req.method === 'GET')
    return actions.discount.getAllProductsDiscountsCB(req, res);
  if (req.url === '/api/products/showDiscount/promise' && req.method === 'GET')
    return actions.discount.getAllProductsDiscountsPromise(req, res);
  if (req.url === '/api/products/showDiscount/async' && req.method === 'GET')
    return actions.discount.getAllProductsDiscountsAsync(req, res);
  if (req.url === '/api/products/store/csv' && req.method === 'PUT') {
    return actions.uploadJson.uploadJson(req, res);
  }
  respondNotFound(req, res);
});

server.listen(port, hostname);
console.log(`Server has been started on port ${port}`);
enableGracefulExit();

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route Not Found' }));
}

//Graceful exit
function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);

    console.log('Gracefully stopping...');
    server.close(() => {
      process.exit();
    });
  };

  //Catches ctrl+c event
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  //Catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  //Catches uncaught/unhandled exceptions
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}
