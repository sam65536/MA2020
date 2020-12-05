const obj = {"type":"socks","color":"red","quantity":"3328","price":"10","isPair":"true"};

let obj2 = null;

const buffer = Buffer.from(JSON.stringify(obj));
console.log(JSON.parse(buffer.toString()));

console.log(JSON.parse(buffer.toString()).type);

console.log(Buffer.from(JSON.stringify(obj2)));
