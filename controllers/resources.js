const db = require('../models');

const create = async (req, res, next) => {
  try {
    // { include: [db.Tag, db.User] }
    const resource = await db.Resource.create(req.body, {
      include: [db.Course, db.User],
    });
    await resource.addTags(req.body.tags);
    req.params.id = resource.id;
    next();
    // res.json(resource);
  } catch (error) {
    res.status(500).send(error);
  }
};

const query = (req, _res, next) => {
  req.q = {
    include: [db.User, db.Course, {
      model: db.Tag,
      through: {
        attributes: [],
      },
    }],
  };

  next();
};

const readAll = async (req, res) => {
  try {
    const json = await db.Resource.findAll(req.q);
    res.json(json);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filter = (req, _res, next) => {
  req.q.where = {
    id: req.params.id,
  };

  next();
};

const readOne = async (req, res) => {
  try {
    const json = await db.Resource.findOne(req.q);
    res.json(json);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res, next) => {
  try {
    await db.Resource.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const resource = await db.Resource.findOne(req.q);
    await resource.addTags(req.body.tags);
    next();
  } catch (error) {
    res.status(500).send('Update failed');
  }
};

const destroy = async (req, res) => {
  try {
    res.json({ message: 'Not implmented yet.' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = [create, filter, readOne];
exports.readAll = [query, readAll];
exports.readOne = [query, filter, readOne];
exports.update = [query, filter, update, readOne];
exports.delete = [query, filter, destroy];
