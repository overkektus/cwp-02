const fs = require('fs');
const net = require('net');
const port = 8124;

const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';

const logger = fs.createWriteStream('./client_id.log');

let seed = 0;

const server = net.createServer((client) => {
  console.log('Client connected');
  client.setEncoding('utf8');

  client.on('data', (data) => {
    
    if(data === clientString) {
      client.id = Date.now() + seed++;
      client.write(good);

    } else {
      
    }

  });

  client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});

const writeToLog = (data) => {
  logger.write(data);
}

const generateAnswer = () => {
  return Math.round(Math.random());
}