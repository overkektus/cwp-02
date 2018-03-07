const fs = require('fs');
const net = require('net');
const port = 8124;

const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, async function() {
  client.write(clientString);
  client.read(res);
  console.log(res);
  const question = await getQuestions();
  console.log(question);
});

client.on('data', function(data) {
  console.log(data);
  client.destroy();
});

client.on('close', function() {
  console.log('Connection closed');
});

function getQuestions() {
  return new Promise((resolve, reject) => {
    fs.readFile('./qa.json', (err, data) => {
      resolve(JSON.parse(data));
    });
  });
}
