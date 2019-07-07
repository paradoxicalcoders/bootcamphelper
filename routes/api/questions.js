const router = require('express').Router();
const questionController = require('../../controllers/questions');

router.route('/')
  .get(questionController.readAll)
  .post(questionController.create);

router.route('/:id')
  .get(questionController.readOne)
  .put(questionController.update)
  .delete(questionController.delete);

module.exports = router;
