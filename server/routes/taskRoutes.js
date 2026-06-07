const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Create Task (Protected)
router.post('/', authMiddleware, async (req, res) => {
    try
    {
        const {title, description} = req.body;
        
        if(!title)
        {
            return res.status(401).json({
                message: "Title required !"
            });
        }

        const newTask = new Task({
            title,
            description,
            user: req.user.userId
        });

        await newTask.save();
        res.status(201).json({
            message: "Task created successfully !",
            task: newTask
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in creating task !",
            error: error.message
        });
    }
});

module.exports = router;