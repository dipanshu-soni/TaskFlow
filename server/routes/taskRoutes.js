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

router.get('/', authMiddleware, async (req, res) => {
    try
    {
        const tasks = await Task.find({user: req.user.userId});

        res.status(200).json({
            message: "Tasks fetched successfully !",
            tasks
        });
    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).json({
            message: "Error in fetching tasks !",
            error: error.message
        });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try
    {
        const {id} = req.params;

        const task = await Task.findOne({
            _id: id,
            user: req.user.userId
        });

        if(!task)
        {
            return res.status(404).json({
                message: "Task not found !"
            });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed ?? task.completed;

        await task.save();
        res.json({
            message: "Task updated successfully !",
            task
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in updating !",
            error: error.message
        });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try
    {
        const {id} = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });

        if(!task)
        {
            return res.status(404).json({
                message: "Task not found !"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in deleting !",
            error: error.message
        });
    }
});

module.exports = router;