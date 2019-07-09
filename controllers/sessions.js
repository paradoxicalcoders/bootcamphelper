const bcs = require('../services/bcsService.js');

module.exports = {
  list: async (req, res) => {
    try {
      const response = await bcs.sessions(req.params.id, req.headers);
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  details: async (req, res) => {
    try {
      const response = await bcs.sessionDetail(req.params.id, req.headers);
      res.json(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
