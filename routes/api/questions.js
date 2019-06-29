const router = require('express').Router();
const questionController = require('../../controllers/questionController');

router.route('/')
  .get(questionController.readAll)
  .post(questionController.create);

router.route('/:id')
  .get(questionController.readOne)
  .put(questionController.update)
  .delete(questionController.delete);

module.exports = router;
