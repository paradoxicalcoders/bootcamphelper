// const { io } = require('../server');
function test() {
  return 'test';
}

const users = [];

module.exports = {
  socketManager: (socket) => {
    // console.log('Socket ID: ', socket.id);

    socket.on('USER_CONNECTED', (user) => {
      console.log(user);
      console.log(test());
      users.push(user);
      console.log(users);
    });
  },
};
