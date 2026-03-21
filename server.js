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

// Connect to MongoDB (cached for serverless environments)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
};

// Wrap app to connect before each request (needed for Vercel serverless)
const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
    return app(req, res);
};

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
module.exports = handler;
