const router = require('express').Router();
const authRoutes = require('./auth');
const attendanceRoutes = require('./attendance');
const sessionsRoutes = require('./sessions');
const questionRoutes = require('./questions');

// Book routes
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
