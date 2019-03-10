const express = require('express');
const app = express();
require('dotenv').config({ path: 'variables.env' });

const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cors = require('cors');

const processMessage = require('./dialogflow-connector');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


io.on('connection', function (client) {
  console.log('client connected...', client.id)

  client.on('message', function(message){
    processMessage(client, message);
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(3010, function (err) {
  if (err) throw err
  console.log('listening on port 3010')
})