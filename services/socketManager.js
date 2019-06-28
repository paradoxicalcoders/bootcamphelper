// const { io } = require('../server');

module.exports = {
  socketManager: (socket) => {
    // console.log('Socket ID: ', socket.id);

    socket.on('USER_CONNECTED', (user) => {
      console.log(user);
      console.log(test());
    });

    socket.on('ANNOUNCEMENT', (announcement) => {
      console.log(announcement)
      socket.broadcast.emit('GET_ANNOUNCEMENT', announcement)
    })
  }
};

function test () {
  return 'test';
}