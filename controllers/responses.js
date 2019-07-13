const db = require('../models');

const create = async (req, res) => {
  try {
    res.json(await db.Response.create(req.body));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
