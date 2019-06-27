// const { io } = require('../server');

module.exports = function (socket) {
  // console.log('Socket ID: ', socket.id);

  socket.on('USER_CONNECTED', (user) => {
    console.log(user);
  });
};
