import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { showSuccessAlert, showErrorAlert, showToast } from "../components/Alert";

import '../styles/login.css'

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (formInput) => {
        // Validate the username and password 
        if (formInput.username && formInput.password) {
            showToast("success", "Signed in successfully");
            navigate(`/dashboard/${formInput.username}`);
        } else {
            showErrorAlert("Login error", "Please enter the required fields")
        }
    }

    const navToSignup = () => {

        navigate('/signup');
    }

    return (
        <div className="loginFormContainer">
            <div className="loginForm">
                <form className='login-content' onSubmit={handleSubmit(handleLogin)}>
                    <h2 className="loginFormTitle">Login</h2>
                    <div className='input-label'>
                        <label>
                            Username:
                        </label>
                        <input className="login-input" type="text" name="username" autoComplete='off'
                            {...register('username', { required: "Please enter your username" })}/>
                    </div>

                    {errors.username &&
                        <div className='input-label'>
                            <label className="invalid">{errors.username.message}</label>
                            <br/>
                        </div>
                    }


                    <div className='input-label'>
                        <label>
                            Password:
                        </label>
                        <input className="login-input" type="password" name="password"
                            {...register('password', { required: "Please enter your password" })}
                            />
                    </div>

                    {errors.password && 
                            <div className='input-label'>
                            <label className="invalid">{errors.password.message}</label>
                            <br/>
                            </div>}

                    <div className='login-signup'>
                        <button className="loginButton1">Log In</button>
                    </div>
                </form>

                <button className="loginButton2" onClick={navToSignup}>Sign Up</button>

            </div>
        </div>
    )
}

export default Login;
