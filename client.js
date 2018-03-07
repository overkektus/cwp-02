const fs = require('fs');
const net = require('net');
const port = 8124;

const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';

let questions;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
  client.write(good);
  fs.readFile('./qa.json', (err, data) => {
    questions = JSON.parse(data);
  });
});

client.on('data', function(data) {
  console.log(data);
  client.destroy();
});

client.on('close', function() {
  console.log('Connection closed');
});
