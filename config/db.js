const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the connection pool
// IMPORTANT for Vercel: We use a low connection limit to prevent exhausting the DB connections
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_mgmt',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null, // Added for hosted providers like Aiven/Railway
    waitForConnections: true,
    connectionLimit: 5, // Lower limit for serverless functions
    queueLimit: 0
});

module.exports = pool;
