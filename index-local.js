//use this file while developing locally

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseAccessRoutes = require('./routes/courseAccessRoutes');
const courseDataRoutes = require('./routes/courseDataRoutes');
const port = 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

app.use(cors({
    origin: '*', // Allow requests from this origin
    credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const dbURI = process.env.DB_URI; // Use environment variable for database URI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

app.use(authRoutes);
app.use(courseAccessRoutes);
app.use(courseDataRoutes);


