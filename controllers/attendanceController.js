const bcs = require('../services/bcsService.js');

module.exports = {
  list: async (req, res) => {
    try {
      const response = await bcs.attendance(req.body, req.headers);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
