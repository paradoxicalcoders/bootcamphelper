const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const socketIo = require('socket.io');
const passport = require('./config/passport');
const { socketManager } = require('./services/socketManager');

const db = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(session({ secret: 'bootcamp helper', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const WHITE_LIST = ['http://localhost:3001', 'http://localhost:3001/', 'http://kubootcamphelper.herokuapp.com', 'https://kubootcamphelper.herokuapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    console.log('Origin: ', origin); // eslint-disable-line no-console
    if (WHITE_LIST.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
};
app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

const server = app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

let FORCE_SCHEMA = false;
if (process.env.NODE_ENV === 'test') {
  FORCE_SCHEMA = true;
}

db.sequelize.authenticate()
  .then(() => {
    db.sequelize.sync({ force: FORCE_SCHEMA }).then(() => {
      const io = socketIo(server);
      io.on('connection', socketManager);
      // app.listen(PORT, () => {
      //   // eslint-disable-next-line
      //   console.log(`🌎 ==> API server now on port ${PORT}!`);
      // });
    });
  })
  .catch(console.error); // eslint-disable-line no-console

module.exports = app;
