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

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const dbURI = "mongodb+srv://ashendr1:2ScuA7QoqvZzVC6U@cluster0.jhhuy.mongodb.net/SCE0?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

app.use(authRoutes);
app.use(courseAccessRoutes);
app.use(courseDataRoutes);


