const CourseAccess = require('../models/CourseAccess');

const course_access_get = (req, res) => {
    const email = req.email;
    console.log('course_access', email);
    CourseAccess.findOne({email})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {course_access_get};