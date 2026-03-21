# MySQL Setup Guide

Follow these steps to set up your MySQL database for the Student Management System.

## 1. Install MySQL
If you don't have MySQL installed, we recommend using one of the following:
- **XAMPP**: Includes MariaDB (MySQL-compatible) and a web-based management tool (phpMyAdmin).
- **MySQL Installer**: The official installer from MySQL.

## 2. Create the Database
Open your MySQL terminal or phpMyAdmin and run the following commands (or import the `schema.sql` file):

```sql
CREATE DATABASE IF NOT EXISTS student_mgmt;
USE student_mgmt;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    rollNumber VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    gpa DECIMAL(4, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Active',
    address TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 3. Configure Environment Variables
Ensure your `.env` file matches your local MySQL credentials:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=student_mgmt
```

## 4. Run the Application
1. Open your terminal in the project folder.
2. Run `npm install` (to ensure all dependencies are installed).
3. Run `npm start` or `npm run dev`.
4. Access the app at `http://localhost:5000`.
