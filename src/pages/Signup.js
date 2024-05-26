import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { showAlert, showToast } from "../components/Alert";
import axios from 'axios';

import '../styles/signup.css'

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignup = async (formInput) => {
        // Validate the username and password 
        try{
            const response = await axios.post('http://localhost:3001/signup',{
            username:  formInput.username,
            fullName: formInput.fullName,
            password: formInput.password,
            password2: formInput.password2,
            email: formInput.email})
            showToast("success", "You have successfully signed up");
            navigate(`/dashboard/${formInput.username}`);
        }
        catch(error){
            if(error.response){
                const errorCode = error.response.data.responseCode;
                switch (errorCode) {
                    case '100':
                        setErrorMessage('Fill all fields');
                        showAlert("error", "Signup error", "Please fill in all the fields");
                        break;
                    case '303':
                        setErrorMessage('Passwords do not match');
                        showAlert("error", "Signup error", "Passwords do not match");
                        break;
                    case '300':
                        setErrorMessage('Already existing user');
                        showAlert("error", "Signup error", "User already exists in the database");
                        break;
                    default:
                        setErrorMessage('An error occurred');
                        showAlert("error", "Signup error", "An error occurred");
                        break;
                }
            }
            else{
                setErrorMessage('something went wrong');
                showAlert("error", "Signup error", "An error occured");
                console.error(error);
            }
        }
        // if ( ) {
        //     if (formInput.password === formInput.password2) {
        //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //         if (emailRegex.test(formInput.email)) {
                    
        //             
        //         } else {
        //             alert('Invalid email address');
        //         }
        //     } else {
        //         alert('Passwords do not match');
        //     }
        // } else {
        //     showAlert("Error", "Sign-up error", "Please fill all the required fields");
        // }
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
                                    {...register('fullName', { required: "Please enter your full name" })}
                                />
                                {errors.fullName &&
                                    <div className='invalid-container'>
                                        <label className="invalid">{errors.fullName.message}</label>
                                    </div>}
                            </div>



                            <div className="type">
                                <label className="type2">
                                    E-mail*:
                                </label>
                                <input className="input" type="email"
                                    {...register('email', { required: "Please enter your email" })} />
                                {errors.email &&
                                    <div className='invalid-container'>
                                        <label className="invalid">{errors.email.message}</label>
                                    </div>}
                            </div>

                            <div className="type">
                                <label className="type2">
                                    Username*:
                                </label>
                                <input className="input" type="text"
                                    {...register('username', { required: "Please enter your username" })} />
                                {errors.username &&
                                    <div className='invalid-container'>
                                        <label className="invalid">{errors.username.message}</label>
                                    </div>}


                            </div>

                            <div className="type">
                                <label className="type2">
                                    Password*:
                                </label>
                                <input className="input" type="password"
                                    {...register('password', { required: "Please enter your password" })} />
                                {errors.password &&
                                    <div className='invalid-container'>
                                        <label className="invalid">{errors.password.message}</label>
                                    </div>}


                            </div>

                            <div className="type">
                                <label className="type2">
                                    Comfirm Password*:
                                </label>
                                <input className="input" type="password"
                                    {...register('password2', { required: "Please repeat your password" })} />
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
