const CourseData = require('../models/courseData');

module.exports.course_data_get = async (req, res) => {
    const {courseNameSection} = req.query;
    console.log('course_data_get', courseNameSection);
    try {
        const courseData = await CourseData.findOne({courseNameSection});
        if(courseData) {
            res.status(200).json({courseData});
        } else {
            res.status(400).send('course not found');
        }
    } catch(err) {
        res.status(400).send('error: ${err}');
    }
}