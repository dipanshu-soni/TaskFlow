import '../styles/register.css';
import {useState} from 'react';
import axios from 'axios';  // Axios helps React communicate with backend.

function Register()
{
    /*
        Syntax of useState - const [value, setValue] = useState(initialValue);
        value - current state
        setValue - function to update state
        initialValue - starting value
    */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try
        {
            const userData = {name, email, password, age};

            console.log(userData);
            // send POST request with data
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                userData
            );

            alert(response.data.message);
        }
        catch(error)
        {
            alert("Registration Failed !");
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;

/*
    Full flow of react state (React Cycle)

    User types
        ↓
    onChange triggers
        ↓
    e.target.value gets text
        ↓
    setName updates state
        ↓
    React re-renders
        ↓
    value={name} updates input
*/

/*
    Full Flow from frontend to backend
    
    User types
        ↓
    React state updates
        ↓
    User clicks Register
        ↓
    onSubmit triggers
        ↓
    handleRegister runs
        ↓
    Axios sends POST request
        ↓
    Backend receives data
        ↓  
    MongoDB stores user
        ↓
    Response comes back
        ↓
    Alert shown
*/