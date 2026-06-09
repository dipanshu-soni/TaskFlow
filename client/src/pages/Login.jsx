import '../styles/register.css';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try
        {
            const userData = {email, password};

            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                userData
            );

            alert(response.data.message);
            
            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
        }
        catch(error)
        {
            alert("Login Failed !");
            console.log(error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <form className="register-form" onSubmit={handleLogin}>

                    <h2>Login</h2>

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

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

/*
    Login Flow

    User enters credentials
        ↓
    Frontend sends login request
        ↓
    Backend verifies password
        ↓
    JWT token generated
        ↓
    Frontend receives token
*/