const Router = require('express').Router;
const courseDataController = require('../controllers/courseDataController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/courseData', authMiddleware.requireAuth, courseDataController.course_data_get);

module.exports = router;