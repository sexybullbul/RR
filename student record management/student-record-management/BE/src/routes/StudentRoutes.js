const express = require('express');
const Student = require('../models/student');
const router = express.Router();

router.post('/students', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const student = new Student({ name, email, phone });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/students/:id', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
