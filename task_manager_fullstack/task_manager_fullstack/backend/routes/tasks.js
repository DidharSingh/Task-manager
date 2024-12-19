const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, completed: false });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { completed } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { completed }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
