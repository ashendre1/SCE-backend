const mongoose = require('mongoose');

const courseDataSchema = new mongoose.Schema({
    semester: String,
    courseName: String,
    section: String,
    courseNameSection: String,
    instructor: String,
    totalEnrollment: Number,
    notProgressing: Number,
    ghost_h50_l75: Number,
    ghost_h50_l60: Number,
    ghost_h50_l50: Number,
    ghost_h50_l25: Number,
    ghost_h50_l10: Number,
    ghost_h25_l75: Number,
    ghost_h25_l60: Number,
    ghost_h25_l50: Number,
    ghost_h25_l25: Number,
    ghost_h25_l10: Number,
    ghost_h10_l75: Number,
    ghost_h10_l60: Number,
    ghost_h10_l50: Number,
    ghost_h10_l25: Number,
    ghost_h10_l10: Number,
    shocked: Number,
    lost_version1: Number,
    lost_version2: Number,
    lost_version3: Number,
    jet_w: Number,
    underperformer: String,
    grade_A: Number,
    grade_B: Number,
    grade_C: Number,
    grade_D: Number,
    grade_F: Number,
    grade_W: Number,
    grade_Other: Number,
    note: String
});

const CourseData = mongoose.model('course_data', courseDataSchema);
module.exports = CourseData;