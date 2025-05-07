const mongoose = require('mongoose');

const courseAccessSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    course_list: {
        type: Array,
        required: true
    }
});

const CourseAccess = mongoose.model('course_access', courseAccessSchema);
module.exports = CourseAccess;