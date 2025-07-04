const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { connectDB } = require('./utils/db');
const { uploadImage } = require('./utils/imagekit');

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB().catch(console.error);

// Middleware
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.redirect('/admin');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
