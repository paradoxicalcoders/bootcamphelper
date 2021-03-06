/* eslint-disable no-console */
const { io } = require('../server');

const users = {};

module.exports = {
  socketManager: (socket) => {
    console.log('Socket ID: ', socket.id);
    users[socket.id] = { room: null };

    socket.on('SEND_USER_INFO', (user) => {
      console.log(user, 'USER');
      if (!user || !user.courses || user.courses.length === 0) return;

      if (!user.isAdmin) {
        socket.join(user.courses[0].id);
        users[socket.id].room = user.courses[0].id;
      } else if (user.isAdmin) {
        users[socket.id].room = [];
        user.courses.forEach((element) => {
          // socket.join(element.id);
          // socket.join(`${element.id}+admin`);
          users[socket.id].room.push(element.id, `${element.id}+admin`);
        });
        socket.join(users[socket.id].room);
      }

      console.log(users);
    });

    socket.on('SEND_QUESTION', (questionObject) => {
      const { id: QuestionId, question, selectedClasses } = questionObject;
      console.log(QuestionId, question, selectedClasses);
      selectedClasses.forEach((id) => {
        io.to(id).emit('GET_QUESTION', {
          QuestionId,
          question,
          selectedClasses,
        });
      });
    });

    socket.on('GOT_QUESTION', (obj) => {
      const { courseID, userID, questionObj } = obj;
      const { question, QuestionId } = questionObj;
      io.to(`${courseID}+admin`).emit('GET_MAX_COUNT', {
        courseID,
        userID,
        question,
        QuestionId,
      });
    });

    socket.on('SEND_RESPONSE', (res) => {
      socket.broadcast.emit('GET_RESPONSE', res);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      delete users[socket.id];
      console.log(users);
    });
  },
};
