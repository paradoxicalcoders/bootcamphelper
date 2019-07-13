const router = require('express').Router();
const responsesController = require('../../controllers/responses');

router.route('/').post(responsesController.create);

module.exports = router;
