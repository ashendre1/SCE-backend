const mongoose = require('mongoose');

const courseDataSchema = new mongoose.Schema({
    semester: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    courseNameSection: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    totalEnrollment: {
        type: Number,
        required: true
    },
    notProgressing: {
        type: Number,
        required: true
    },
    ghost_h50_l75: {
        type: Number,
        required: true
    },
    ghost_h50_l60: {
        type: Number,
        required: true
    },
    ghost_h50_l50: {
        type: Number,
        required: true
    },
    ghost_h50_l25: {
        type: Number,
        required: true
    },
    ghost_h50_l10: {
        type: Number,
        required: true
    },
    ghost_h25_l75: {
        type: Number,
        required: true
    },
    ghost_h25_l60: {
        type: Number,
        required: true
    },
    ghost_h25_l50: {
        type: Number,
        required: true
    },
    ghost_h25_l25: {
        type: Number,
        required: true
    },
    ghost_h25_l10: {
        type: Number,
        required: true
    },
    ghost_h10_l75: {
        type: Number,
        required: true
    },
    ghost_h10_l60: {
        type: Number,
        required: true
    },
    ghost_h10_l50: {
        type: Number,
        required: true
    },
    ghost_h10_l25: {
        type: Number,
        required: true
    },
    ghost_h10_l10: {
        type: Number,
        required: true
    },
    shocked: {
        type: Number,
        required: true
    },
    lost_version1: {
        type: Number,
        required: true
    },
    lost_version2: {
        type: Number,
        required: true
    },
    lost_version3: {
        type: Number,
        required: true
    },
    jet_w: {
        type: Number,
        required: true
    },
    underperformer: {
        type: String,
        required: true
    },
    grade_A: {
        type: Number,
        required: true
    },
    grade_B: {
        type: Number,
        required: true
    },
    grade_C: {
        type: Number,
        required: true
    },
    grade_D: {
        type: Number,
        required: true
    },
    grade_F: {
        type: Number,
        required: true
    },
    grade_W: {
        type: Number,
        required: true
    },
    grade_Other: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    }
});

const CourseData = mongoose.model('course_data', courseDataSchema);
module.exports = CourseData;