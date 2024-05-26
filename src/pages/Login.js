import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { showAlert, showToast } from "../components/Alert";
import axios from 'axios';
import '../styles/login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (formInput) => {
        // Validate the username and password 
        try{
            const response = await axios.post('http://localhost:3001/login',{ 
            username: formInput.username,
            password: formInput.password});
            showToast("success", "Logged in successfully");
            navigate(`/dashboard/${formInput.username}`);
        }
        catch(error){
            if (error.response) {
                const errorCode = error.response.data.responseCode;
                switch (errorCode) {
                    case '100':
                        setErrorMessage('Please enter both username and password');
                        showAlert("Error", "Login error", "Please enter both username and password");
                        break;
                    case '303':
                        setErrorMessage('Incorrect password');
                        showAlert("Error", "Login error", "Incorrect password");
                        break;
                    case '300':
                        setErrorMessage('User details not found');
                        showAlert("Error", "Login error", "User details not found");
                        break;
                    default:
                        setErrorMessage('An error occurred');
                        showAlert("Error", "Login error", "An error occurred");
                        break;
                }
            }
            else{
                setErrorMessage('something went wrong');
                showAlert("Error", "Login error", "Please enter the required fields");
            }
        }
    }

    const navToSignup = () => {

        navigate('/signup');
    }

    return (
        <div className="loginFormContainer">
            <div className="loginForm">
                <div className='loginForm-signupButton'>
                    <form className='login-content' onSubmit={handleSubmit(handleLogin)}>
                        <h2 className="loginFormTitle">Login</h2>
                        <div className='input-label'>
                            <label>
                                Username:
                            </label>
                            <input className="login-input" type="text" name="username" autoComplete='off' placeholder='Enter Username'
                                {...register('username', { required: "Please enter your username" })} />


                            {errors.username &&
                                <div className='invalid-container'>
                                    <label className="invalid">{errors.username.message}</label>
                                    <br />
                                </div>
                            }

                        </div>

                        <div className='input-label'>
                            <label>
                                Password:
                            </label>
                            <input className="login-input" type="password" name="password" placeholder='Enter password'
                                {...register('password', { required: "Please enter your password" })}
                            />


                            {errors.password &&
                                <div className='invalid-container'>
                                    <label className="invalid">{errors.password.message}</label>
                                    <br />
                                </div>}
                        </div>


                        <button className="loginButton1">Log In</button>

                    </form>

                    <button className="loginButton2" onClick={navToSignup}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
