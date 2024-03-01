import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/signup.css'

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = () => {
        // Validate the username and password 
        if (username && email && fullName && password && password2) {
            if (password === password2) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
                if (emailRegex.test(email)) {
                    // Valid email address
                    // You can proceed with your form submission or other actions
                    navigate(`/dashboard/${username}`);
                } else {
                    alert('Invalid email address');
                }
            } else {
                alert('Passwords do not match');
            }
        } else {
            alert('Please fill in all the fields');
        }
    };
    

    return (
        <div>
            <div className="signupFormContainer">
                <div className="signupForm">
                    <div className='signup-content'>
                        <h2 className="signupFormTitle">Signup</h2>
                        <div className='input-container'>

                            <div className="type">
                                <label className="type2">
                                    Full Name*: 
                                </label>
                                <input className="input" type="text" value={fullName} onChange={(e) => setfullName(e.target.value)} />


                            </div>



                        </div>
                        <div className="type">
                            <label className="type2">
                                E-mail*:
                            </label>
                            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />


                        </div>

                        <div className="type">
                            <label className="type2">
                                Username*:
                            </label>
                            <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />


                        </div>

                        <div class="type">
                            <label class="type2">
                                Password*:
                            </label>
                            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


                        </div>

                        <div class="type">
                            <label class="type2">
                                Comfirm Password*:
                            </label>
                            <input className="input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />


                        </div>
                    </div>
                    <div className="signupButtonContainer">
                        <button className="signupButton" onClick={handleSignup}>Sign Up</button>
                        <Link to="/login" className='linktologin'>Already have an account? Login</Link>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default Signup;
