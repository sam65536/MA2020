const { task1: filter, task2: maxCost, task3: format } = require('../task');
const { getPostData, writeToFile } = require('../utils');
const querystring = require('querystring');

store = global.store || require('../../inventory.json');

function getFilteredBy(req, res) {
  const { criteria, value } = querystring.parse(req.url.split('?').slice(1).join(''));
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(filter(criteria, value, store)));
}

function getMaxCost(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(maxCost(store)));
}

function getJson(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(format(store)));
}

async function createStore(req, res) {
  try {
    const body = await getPostData(req);
    global.store = JSON.parse(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(store));
  } catch (err) {
    console.error(err);
  }
}

async function updateStore(req, res) {
  try {
    const body = await getPostData(req);
    let updatedStore = await writeToFile(JSON.parse(body));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(updatedStore));
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getFilteredBy, getMaxCost, getJson, createStore, updateStore };
