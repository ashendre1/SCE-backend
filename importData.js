const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const CourseData = require('./models/CourseDataImport'); // Adjust the path as needed

const dbURI = "mongodb+srv://ashendr1:2ScuA7QoqvZzVC6U@cluster0.jhhuy.mongodb.net/SCE0?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        importCsvData();
    })
    .catch((err) => console.log(err));

const importCsvData = () => {
    const results = [];
    fs.createReadStream('C:/Users/Shendre/Downloads/Class Profile_DummyData - Sheet6(2).csv') // Adjust the path to your CSV file
        .pipe(csv())
        .on('data', (data) => {
            // Convert fields to appropriate types and handle invalid values
            const parsedData = {
                semester: data.Semester,
                courseName: data.Course_Name,
                section: data.Section,
                courseNameSection: data.Course_Name_Section,
                instructor: data.Instructor,
                totalEnrollment: data.Total_Enrollment ? parseInt(data.Total_Enrollment, 10) : 0,
                notProgressing: data.Not_Progressing ? parseFloat(data.Not_Progressing) : 0.0,
                ghost_h50_l75: data.Ghost_h50_l75 ? parseFloat(data.Ghost_h50_l75) : 0.0,
                ghost_h50_l60: data.Ghost_h50_l60 ? parseFloat(data.Ghost_h50_l60) : 0.0,
                ghost_h50_l50: data.Ghost_h50_l50 ? parseFloat(data.Ghost_h50_l50) : 0.0,
                ghost_h50_l25: data.Ghost_h50_l25 ? parseFloat(data.Ghost_h50_l25) : 0.0,
                ghost_h50_l10: data.Ghost_h50_l10 ? parseFloat(data.Ghost_h50_l10) : 0.0,
                ghost_h25_l75: data.Ghost_h25_l75 ? parseFloat(data.Ghost_h25_l75) : 0.0,
                ghost_h25_l60: data.Ghost_h25_l60 ? parseFloat(data.Ghost_h25_l60) : 0.0,
                ghost_h25_l50: data.Ghost_h25_l50 ? parseFloat(data.Ghost_h25_l50) : 0.0,
                ghost_h25_l25: data.Ghost_h25_l25 ? parseFloat(data.Ghost_h25_l25) : 0.0,
                ghost_h25_l10: data.Ghost_h25_l10 ? parseFloat(data.Ghost_h25_l10) : 0.0,
                ghost_h10_l75: data.Ghost_h10_l75 ? parseFloat(data.Ghost_h10_l75) : 0.0,
                ghost_h10_l60: data.Ghost_h10_l60 ? parseFloat(data.Ghost_h10_l60) : 0.0,
                ghost_h10_l50: data.Ghost_h10_l50 ? parseFloat(data.Ghost_h10_l50) : 0.0,
                ghost_h10_l25: data.Ghost_h10_l25 ? parseFloat(data.Ghost_h10_l25) : 0.0,
                ghost_h10_l10: data.Ghost_h10_l10 ? parseFloat(data.Ghost_h10_l10) : 0.0,
                shocked: data.Shocked ? parseFloat(data.Shocked) : 0.0,
                lost_version1: data.Lost_version1 ? parseFloat(data.Lost_version1) : 0.0,
                lost_version2: data.Lost_version2 ? parseFloat(data.Lost_version2) : 0.0,
                lost_version3: data.Lost_version3 ? parseFloat(data.Lost_version3) : 0.0,
                jet_w: data.Jet_W ? parseFloat(data.Jet/W) : 0.0,
                underperformer: data.Underperformer === 'NA' ? null : parseInt(data.Underperformer, 10),
                grade_A: data.Grade_A ? parseInt(data.Grade_A, 10) : 0,
                grade_B: data.Grade_B ? parseInt(data.Grade_B, 10) : 0,
                grade_C: data.Grade_C ? parseInt(data.Grade_C, 10) : 0,
                grade_D: data.Grade_D ? parseInt(data.Grade_D, 10) : 0,
                grade_F: data.Grade_F ? parseInt(data.Grade_F, 10) : 0,
                grade_W: data.Grade_W ? parseInt(data.Grade_W, 10) : 0,
                grade_Other: data.Grade_Other ? parseInt(data.Grade_Other, 10) : 0,
                note: data.Note
            };
            console.log(parsedData);
            results.push(parsedData);
        })
        .on('end', () => {
            CourseData.insertMany(results)
                .then(() => {
                    console.log('Data imported successfully');
                    mongoose.connection.close();
                })
                .catch((err) => {
                    console.log('Error importing data:', err);
                    mongoose.connection.close();
                });
        });
};