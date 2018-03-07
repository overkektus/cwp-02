const fs = require('fs');
const net = require('net');
const port = 8124;
const host = '127.0.0.1';

const clientString = 'QA';
const good = 'ACK';
const bad = 'DEC';

const client = new net.Socket();

let questions = [];
let currentIndex = -1;

client.setEncoding('utf8');

client.connect({port: port, host: host}, async () => {
  client.write(clientString);
  questions = await getQuestions();
});

client.on('data', async (data) => {
  if(data === bad) client.destroy();
  if(data === good) sendQuestion();
  else {
    let qst = questions[currentIndex];
    let answer = qst.ans;
    console.log('\n' + qst.quest);
    console.log('Answer:' + data);
    console.log('Server:' + answer);
    console.log('Result:' + (data === answer ? 'It is a right answer': 'Bad answer'));
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
  if(currentIndex < questions.length - 1) {
    let qst = questions[++currentIndex].quest;
    client.write(qst);
  } else
    client.destroy();
}