const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseAccessRoutes = require('./routes/courseAccessRoutes');
const courseDataRoutes = require('./routes/courseDataRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Replace with your frontend domain
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use(authRoutes);
app.use(courseAccessRoutes);
app.use(courseDataRoutes);

// MongoDB connection
const dbURI = "";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // SSL options
        const options = {
            key: fs.readFileSync('./config/cci-ci-test_charlotte_edu.key'), // Update paths
            cert: fs.readFileSync('./config/cci-ci-test_charlotte_edu.crt'),
        };

        // Start HTTPS server
        https.createServer(options, app).listen(443, () => {
            console.log('HTTPS Server running on port 443');
        });
    })
    .catch((err) => console.log(err));
