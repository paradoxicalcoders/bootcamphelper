
module.exports = {
  socketManager: (socket) => {
    console.log('Socket ID: ', socket.id);

    socket.on('SEND_QUESTION', (question, id) => {
      // console.log(question, id);
      socket.broadcast.emit('GET_QUESTION', { question, id });
    });

    socket.on('SEND_RESPONSE', (val) => {
      // console.log(val, ' - RESPONSE VAL');
      socket.broadcast.emit('GET_RESPONSE', val);
    });
  },
};
