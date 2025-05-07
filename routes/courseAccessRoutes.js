const Router = require('express').Router;
const courseAccessController = require('../controllers/courseAccessController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/courseAccess', authMiddleware.extractUsername, courseAccessController.course_access_get);

module.exports = router;