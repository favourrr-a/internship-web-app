import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Validate the username and password 
        if (username && password) {
            navigate(`/dashboard/${username}`);
        } else {
            alert('Please enter both username and password.');
        }
    }

    const navToSignup = () => {

        navigate('/signup');
    }

    return (
        <div className="loginFormContainer">
            <div className="loginForm">
                <div className='login-content'>
                    <h2 className="loginFormTitle">Login</h2>
                    <div className='input-label'>
                        <label>
                            Username:
                        </label>
                        <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <br />
                    </div>


                    <div className='input-label'>
                        <label>
                            Password:
                        </label>
                        <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                    </div>

                    <div className='login-signup'>

                        <button className="loginButton1" onClick={handleLogin}>Log In</button>
                        <button className="loginButton1" onClick={navToSignup}>Sign Up</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
