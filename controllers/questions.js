const db = require('../models');


const create = async (req, res) => {
  try {
    const question = await db.Question.create(req.body, { include: [db.Course] });
    await question.addCourses(req.body.courses);
    res.json(question);
  } catch (error) {
    res.status(500).send(error);
  }
};

const readAll = async (req, res) => {
  try {
    res.json(await db.Question.findAll({
      include: [{
        model: db.Course,
        // attributes: ['id'],
        through: {
          attributes: [],
        },
      }],
    }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const filter = (req, res, next) => {
  req.q = {
    where: {
      id: req.params.id,
    },
    include: [{
      model: db.Course,
      through: {
        attributes: [],
      },
    }],
  };

  next();
};

const readOne = async (req, res) => {
  try {
    res.json(await db.Question.findOne(req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    res.json(await db.Question.update(req.body, req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    res.json(await db.Question.destroy(req.q));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.readAll = readAll;
exports.readOne = [filter, readOne];
exports.update = [filter, update];
exports.delete = [filter, destroy];
