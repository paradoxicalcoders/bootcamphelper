const router = require('express').Router();
const passport = require('../../config/passport')
const authController = require('../../controllers/authController');

router.use(passport.authenticate('local'));

// Matches with '/api/auth/login'
router.route('/login')
  .post(authController.login);

module.exports = router;
