// const { io } = require('../server');

module.exports = {
  socketManager: (socket) => {
    // console.log('Socket ID: ', socket.id);

    socket.on('USER_CONNECTED', (user) => {
      console.log(user);
      console.log(test());
    });
  }
};

function test () {
  return 'test';
}