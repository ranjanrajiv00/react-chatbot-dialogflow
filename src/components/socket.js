const io = require('socket.io-client')

export default function () {
  const socket = io.connect('http://localhost:3010')

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function sendMessage(msg) {
    socket.emit('message', msg )
  }

  function receiveMessage(onMessageReceive) {
    socket.on('message', onMessageReceive);
  }

  return {
    sendMessage,
    receiveMessage
  }
}

