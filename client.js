const fs = require('fs');
const net = require('net');
const port = 8124;

const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';

const client = new net.Socket();

let question;
let currentIndex = -1;

client.setEncoding('utf8');

client.connect(port, async () => {
  client.write(clientString);
  question = await getQuestions();
});

client.on('data', (data) => {
  if(data === bad) client.destroy();
  if(data === good) sendQuestion();
  else {
    sendQuestion();
  }
});

client.on('close', () => {
  console.log('Connection closed');
});

const getQuestions = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./qa.json', (err, data) => {
      resolve(JSON.parse(data));
    });
  });
}

const sendQuestion = () => {
  if(currentIndex < question.length - 1) {
    let qst = question[++clientIndex].quest;
    client.write(qst);
  } else
    client.destroy();
}