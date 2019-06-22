const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');
const bcs = require('../services/bcsService');

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a 'username'
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    // When a user tries to sign in this code runs
    const auth = await bcs.login(email, password);

    if (!auth.success) {
      // BCS login failed
      return done(null, false, {
        message: auth.errorCode
      });
    } else {
      // Successfully BCS login, return user details
      const { data: user } = await bcs.me(auth.authenticationInfo.authToken);
      return done(null, user);
    }
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
