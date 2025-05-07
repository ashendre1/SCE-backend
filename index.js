// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');

// Import routes and middleware
const authRoutes = require('./routes/authRoutes');
const courseAccessRoutes = require('./routes/courseAccessRoutes');
const courseDataRoutes = require('./routes/courseDataRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

// Initialize the app
const app = express();
const port = 8000;

// HTTPS options
const options = {
    key: fs.readFileSync("./config/cci-ci-test_charlotte_edu.crt"),
    cert: fs.readFileSync("./config/publicKeyCert.pem"),
    ca: [
        fs.readFileSync("./config/intermediateCert.pem"),
        fs.readFileSync("./config/rootCert.pem")
    ]
};

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://cci-ci-test.charlotte.edu:3000",
            "https://cci-ci-test.charlotte.edu"
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the origin
        } else {
            callback(new Error("Not allowed by CORS"), false); // Block the origin
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// MongoDB connection
const dbURI = "mongodb+srv://ashendr1:2ScuA7QoqvZzVC6U@cluster0.jhhuy.mongodb.net/SCE0?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        https.createServer(options, app).listen(port, () => {
            console.log(`Server is running on https://localhost:${port}`);
        });
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use(authRoutes);
app.use(courseAccessRoutes);
app.use(courseDataRoutes);