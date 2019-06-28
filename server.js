const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const db = require('./models');
const routes = require('./routes');
const passport = require('./config/passport');
const corsOptions = require('./config/cors.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(session({ secret: 'bootcamp helper', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

// Dynamically force schema refresh only for 'test'
const FORCE_SCHEMA = process.env.NODE_ENV === 'test';


db.sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync({ force: FORCE_SCHEMA })
      .then(() => {
        app.listen(PORT, () => {
          // eslint-disable-next-line
          console.log(`🌎 ==> API server now on port ${PORT}!`);
          app.emit('appStarted');
        });
      })
      .catch(console.error); // eslint-disable-line no-console
  })
  .catch(console.error); // eslint-disable-line no-console

module.exports = app;
