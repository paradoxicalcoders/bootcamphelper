const router = require('express').Router();
const tagController = require('../../controllers/tags');

router.route('/')
  .get(tagController.readAll)
  .post(tagController.create);

router.route('/:id')
  .get(tagController.readOne)
  .put(tagController.update)
  .delete(tagController.delete);

module.exports = router;
