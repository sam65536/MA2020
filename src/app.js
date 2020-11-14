require('env2')('./.env.example');
const http = require('http');
const actions = require('./controllers');

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url.match(/\/api\/products\/filter/) && req.method === 'GET')
    return actions.getFilteredBy(req, res);
  if (req.url === '/api/products/maxCost' && req.method === 'GET')
    return actions.getMaxCost(req, res);
  if (req.url === '/api/products/json' && req.method === 'GET') return actions.getJson(req, res);
  if (req.url === '/api/products/addStore' && req.method === 'POST')
    return actions.createStore(req, res);
  if (req.url === '/api/products/updateStore' && req.method === 'POST')
    return actions.updateStore(req, res);
  respondNotFound(req, res);
});

server.listen(port, hostname);
console.log(`Server has been started on port ${port}`);

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route Not Found' }));
}
