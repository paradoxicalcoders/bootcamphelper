const router = require('express').Router();
const attendanceController = require('../../controllers/attendance.js');

// Matches with "/api/auth/login"
router.route('/list')
  .post(attendanceController.list);

module.exports = router;
