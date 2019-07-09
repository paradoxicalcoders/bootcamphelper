const router = require('express').Router();
const authRoutes = require('./auth');
const attendanceRoutes = require('./attendance');
const sessionsRoutes = require('./sessions');
const questionRoutes = require('./questions');
const tagRoutes = require('./tags');
const resourceRoutes = require('./resources');

// Book routes
router.use('/auth', authRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/questions', questionRoutes);
router.use('/tags', tagRoutes);
router.use('/resources', resourceRoutes);

module.exports = router;
