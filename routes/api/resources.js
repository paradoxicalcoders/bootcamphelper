const router = require('express').Router();
const resourceController = require('../../controllers/resources');

router.route('/')
  .get(resourceController.readAll)
  .post(resourceController.create);

router.route('/:id')
  .get(resourceController.readOne)
  .put(resourceController.update)
  .delete(resourceController.delete);

module.exports = router;
