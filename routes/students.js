const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students with search & filter
router.get('/', async (req, res) => {
    try {
        const { search, department, year, status, page = 1, limit = 10 } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { rollNumber: { $regex: search, $options: 'i' } }
            ];
        }
        if (department) query.department = department;
        if (year) query.year = Number(year);
        if (status) query.status = status;

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Student.countDocuments(query);
        const students = await Student.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            students,
            total,
            pages: Math.ceil(total / Number(limit)),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
        res.json({ success: true, student });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST create student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ success: true, student, message: 'Student added successfully' });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ success: false, message: `${field} already exists` });
        }
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
        res.json({ success: true, student, message: 'Student updated successfully' });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ success: false, message: `${field} already exists` });
        }
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
        res.json({ success: true, message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET stats
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await Student.countDocuments();
        const active = await Student.countDocuments({ status: 'Active' });
        const byDept = await Student.aggregate([
            { $group: { _id: '$department', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const byYear = await Student.aggregate([
            { $group: { _id: '$year', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        const avgGpa = await Student.aggregate([
            { $group: { _id: null, avg: { $avg: '$gpa' } } }
        ]);

        res.json({
            success: true,
            stats: {
                total,
                active,
                byDept,
                byYear,
                avgGpa: avgGpa[0]?.avg?.toFixed(2) || 0
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
