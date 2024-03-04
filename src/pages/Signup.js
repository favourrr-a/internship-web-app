import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { showSuccessAlert, showErrorAlert, showToast } from "../components/Alert";

import '../styles/signup.css'

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignup = (formInput) => {
        // Validate the username and password 
        if (username && email && fullName && password && password2) {
            if (password === password2) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailRegex.test(formInput.email)) {
                    showToast("success", "You have successfully signed up")
                    navigate(`/dashboard/${formInput.username}`);
                } else {
                    alert('Invalid email address');
                }
            } else {
                alert('Passwords do not match');
            }
        } else {
            showErrorAlert("Sign-up error", "Please fill all the required fields");
        }
    };


    return (
        <div>
            <div className="signupFormContainer">
                <div className="signupForm">
                    <form className='signup-content' onSubmit={handleSubmit(handleSignup)}>
                        <h2 className="signupFormTitle">Signup</h2>
                        <div className='input-container'>

                            <div className="type">
                                <label className="type2">
                                    Full Name*:
                                </label>
                                <input className="input" type="text"
                                    {...register('fullName', { required: "Please enter your fullNames" })}
                                />
                                {errors.fullName &&
                                    <div>
                                        <label className="invalid">{errors.fullName.message}</label>
                                    </div>}
                            </div>



                            <div className="type">
                                <label className="type2">
                                    E-mail*:
                                </label>
                                <input className="input" type="email"
                                    {...register('email', { required: "Please enter the email" })} />
                                {errors.email &&
                                    <div>
                                        <label className="invalid">{errors.email.message}</label>
                                    </div>}
                            </div>

                            <div className="type">
                                <label className="type2">
                                    Username*:
                                </label>
                                <input className="input" type="text"
                                    {...register('username', { required: "Please enter the username" })} />
                                {errors.username &&
                                    <div>
                                        <label className="invalid">{errors.username.message}</label>
                                    </div>}


                            </div>

                            <div className="type">
                                <label className="type2">
                                    Password*:
                                </label>
                                <input className="input" type="password"
                                    {...register('password', { required: "Please enter the username" })} />
                                {errors.password && <div className='invalid-container'>
                                    <label className="invalid-container">{errors.password.message}</label>
                                    </div>}


                            </div>

                            <div className="type">
                                <label className="type2">
                                    Comfirm Password*:
                                </label>
                                <input className="input" type="password"
                                    {...register('password2', { required: "Please enter the username" })} />
                                {errors.password2 &&
                                    <div className='invalid-container'>
                                        <label className="invalid">{errors.password2.message}</label>
                                    </div>}
                            </div>
                        </div>

                        <div className="signupButtonContainer">
                            <button className="signupButton">Sign Up</button>
                            <Link to="/login" className='linktologin'>Already have an account? Login</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div >


    );
}

export default Signup;
