/* eslint-disable no-console */
const { io } = require('../server');

const users = {};

module.exports = {
  socketManager: (socket) => {
    console.log('Socket ID: ', socket.id);
    users[socket.id] = { room: null };

    socket.on('SEND_USER_INFO', (user) => {
      console.log(user, 'USER');
      if (!user.isAdmin) {
        socket.join(user.enrollments[0].id);
        users[socket.id].room = user.enrollments[0].id;
      }
      console.log(users);
    });

    socket.on('SEND_QUESTION', (questionObject) => {
      const { question, selectedClasses } = questionObject;
      console.log(question, selectedClasses);
      selectedClasses.forEach((id) => {
        io.to(id).emit('GET_QUESTION', question);
      });
    });

    socket.on('SEND_RESPONSE', (val) => {
      socket.broadcast.emit('GET_RESPONSE', val);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      delete users[socket.id];
      console.log(users);
    });
  },
};
