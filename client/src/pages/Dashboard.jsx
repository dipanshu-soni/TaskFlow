import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Dashboard()
{
    const navigate = useNavigate();

    // Store all Tasks
    const [tasks, setTasks] = useState([]);

    // Add task states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Edit task states
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const fetchTasks = async () => {
        try
        {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:5000/api/tasks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();

        try
        {
            const token = localStorage.getItem('token');

            const taskData = {title, description};

            await axios.post(
                'http://localhost:5000/api/tasks',
                taskData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();   // re-fetch latest tasks from backend.

            // clears input boxes after submission.
            setTitle('');
            setDescription('');
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const deleteTask = async (taskId) => {
        try
        {
            const token = localStorage.getItem('token');

            await axios.delete(
                `http://localhost:5000/api/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const updateTask = async (taskId) => {
        try
        {
            const token = localStorage.getItem('token');

            const updatedData = {
                title: editTitle,
                description: editDescription
            }

            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEditTaskId(null);
            fetchTasks();
        }
        catch(error)
        {
            console.log(error);
        }
    };

    // Protect Dashboard
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token)
            navigate('/');
        else
            fetchTasks();
    }, []);
    /* Everything inside return is UI shown on screen, while things
    outside return are backend/frontend logic handling.*/
    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>
            <hr />
            {
                // Task List
                /*Arrow function is used in button tag because it waits until
                delete button is clicked.*/
                tasks.map((task) => (
                    <div
                        key={task._id}
                        style={{
                            border: '1px solid black',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        
                        {
                            editTaskId === task._id
                            ?
                            (
                                <div>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />

                                    <textarea
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                    />

                                    <button
                                        onClick={() => updateTask(task._id)}
                                    >
                                        Update
                                    </button>

                                </div>
                            ):(
                                <div>

                                    <h3>{task.title}</h3>

                                    <p>{task.description}</p>

                                    <p>
                                        Status:
                                        {
                                            task.completed
                                            ? ' Completed'
                                            : ' Pending'
                                        }
                                    </p>

                                </div>
                            )
                        }

                        <button
                            onClick={() => {
                                setEditTaskId(task._id);
                                setEditTitle(task.title);
                                setEditDescription(task.description);
                            }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                toggleComplete(
                                    task._id,
                                    task.completed
                                )
                            }
                        >
                            {
                                task.completed
                                ? 'Undo'
                                : 'Complete'
                            }
                        </button>

                        <button onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                                            </div>
                                        ))
                                    }
        </div>
    );
}

export default Dashboard;

/*
    Full Flow

    Dashboard opens
        ↓
    Check token
        ↓
    If token exists
        ↓
    Fetch tasks from backend
        ↓
    Store tasks in state
*/