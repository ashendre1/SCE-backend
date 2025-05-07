const mongoose = import('mongoose');

const courseAccessSchema = new mongoose.Schema({
    email: String,
    course_list: Array
});

const CourseAccess = mongoose.model('course_access', courseAccessSchema);
module.exports = CourseAccess;