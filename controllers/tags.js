const { Tag } = require('../models');

const create = async (req, res) => {
  try {
    const json = await Tag.create(req.body);
    res.json(json);
  } catch (error) {
    res.status(500).send(error);
  }
};

const readAll = async (_req, res) => {
  try {
    res.json(await Tag.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

const filter = (req, _res, next) => {
  req.q = {
    where: {
      id: req.params.id,
    },
  };

  next();
};

const readOne = async (req, res) => {
  try {
    res.json(await Tag.findOne(req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    res.json(await Tag.update(req.body, req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    res.json(await Tag.destroy(req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.readAll = readAll;
exports.readOne = [filter, readOne];
exports.update = [filter, update];
exports.delete = [filter, destroy];
