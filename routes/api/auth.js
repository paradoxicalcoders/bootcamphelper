const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/api/auth/login"
router.route('/login')
  .post(authController.login);

router.route('/me')
  .get(authController.me);

module.exports = router;
