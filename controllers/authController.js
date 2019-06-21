const bcs = require('../services/bcsService.js');

// Defining methods for the authController
const login = async (req, res, next) => {
  try {
    const { data: auth } = await bcs.login(req.body);

    if (!auth.success) {
      res.status(401).send(auth);
    } else {
      req.headers.authtoken = auth.authenticationInfo.authToken;
      next();
    }

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const me = async (req, res) => {
  try {
    const me = await bcs.me(req.headers);
    res.json(me.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.login = [login, me];
exports.me = me;