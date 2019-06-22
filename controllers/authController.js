const bcs = require('../services/bcsService.js');

// Defining methods for the authController
module.exports = {
  login: async (req, res, next) => {
    res.json(req._passport.session.user);
  }
};