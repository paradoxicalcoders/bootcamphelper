// Defining methods for the authController
module.exports = {
  login: async (req, res) => {
    res.json(req.user);
  },
};
