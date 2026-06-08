import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Dashboard()
{
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token)
            navigate('/');
        else
            fetchTasks();
    }, [])

    const [tasks, setTasks] = useState([]);

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

    const [title, setTitle] = useState('');
    const [decription, setDescription] = useState('');

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
                    name={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>
            {
                // Task List
                tasks.map((task) => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
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