const router = require('express').Router();
const authRoutes = require('./auth');
const attendanceRoutes = require('./attendance');
const sessionsRoutes = require('./sessions');

// Book routes
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/sessions', sessionsRoutes);

module.exports = router;
