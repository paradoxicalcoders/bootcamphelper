const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

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

const whitelist = ['http://localhost:3001', 'http://kubootcamphelper.herokuapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
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

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
