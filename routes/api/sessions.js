const router = require('express').Router();
const sessionsController = require('../../controllers/sessionsController');

// Matches with "/api/auth/login"
router.route('/enrollment/:id')
  .get(sessionsController.list);

router.route('/:id')
  .get(sessionsController.details);

module.exports = router;
