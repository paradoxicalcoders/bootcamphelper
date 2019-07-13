const router = require('express').Router();
const questionController = require('../../controllers/questions');

router.route('/').post(questionController.create);
