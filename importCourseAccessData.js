const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const CourseAccess = require('./models/CourseAccess'); // Adjust the path as needed

const dbURI = "mongodb+srv://ashendr1:2ScuA7QoqvZzVC6U@cluster0.jhhuy.mongodb.net/SCE0?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        importCsvData();
    })
    .catch((err) => console.log(err));

const importCsvData = () => {
    const emailToCoursesMap = new Map();

    fs.createReadStream('C:/path/to/your/csvfile.csv') // Adjust the path to your CSV file
        .pipe(csv())
        .on('data', (data) => {
            const email = data.Email.trim();
            const code = data.Code.trim();

            if (emailToCoursesMap.has(email)) {
                emailToCoursesMap.get(email).add(code);
            } else {
                emailToCoursesMap.set(email, new Set([code]));
            }
        })
        .on('end', async () => {
            try {
                const bulkOperations = [];
                for (const [email, coursesSet] of emailToCoursesMap.entries()) {
                    const courseList = Array.from(coursesSet);
                    bulkOperations.push({
                        updateOne: {
                            filter: { email },
                            update: { $set: { email }, $addToSet: { course_list: { $each: courseList } } },
                            upsert: true
                        }
                    });
                }

                if (bulkOperations.length > 0) {
                    await CourseAccess.bulkWrite(bulkOperations);
                    console.log('Data imported successfully');
                } else {
                    console.log('No data to import');
                }
            } catch (err) {
                console.error('Error importing data:', err);
            } finally {
                mongoose.connection.close();
            }
        });
};