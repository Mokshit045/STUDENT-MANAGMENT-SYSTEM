require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const connectDB = async () => {
    // If connection is established or establishing, return
    if (mongoose.connection.readyState >= 1) return;
    
    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000 // Timeout early so we don't wait 10000ms
    });
    console.log('✅ MongoDB connected successfully');
};

// Middleware to ensure DB connection for API requests (needed for Vercel serverless)
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/students', require('./routes/students'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running', time: new Date() });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For local development: start the server normally
if (require.main === module) {
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
        })
        .catch(err => {
            console.error('❌ MongoDB connection error:', err.message);
            process.exit(1);
        });
}

// Export for Vercel serverless
module.exports = app;
