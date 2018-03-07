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
      writeToLog('Client #' + client.id + ' connected\n');
      client.write(good);
    } else {
      writeToLog('Client #' + client.id + ' has asked: ' + data + '\n');
      let answer = generateAnswer();
      writeToLog('Server answered to Client #' + client.id + ': ' + answer + '\n');
      client.write(answer.toString());
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