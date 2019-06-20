const bcs = require('../services/bcsService.js');

// Defining methods for the authController
module.exports = {
  login: async (req, res) => {
    try {
      const authRes = await bcs.login(req.body);
      res.json(authRes.data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  me: async (req, res) => {
    try {
      const me = await bcs.me(req.headers);
      res.json(me.data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
