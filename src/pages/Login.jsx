import React from 'react';
import { signInWithGoogle } from '../utilities/auth';  // Import the sign-in function from auth.js
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await signInWithGoogle();
        if (user) {
        // Handle successful login, e.g., redirect to main page or save user data
        navigate('/');
        console.log('User successfully logged in:', user);
        } else{
            console.log('Login failed. try again')
        }
    };

    return (
        <div className='login-container'>
        <h1>Get Started</h1>
        <button onClick={handleLogin}>Sign in with Google</button>
        </div>
    );
    }

    export default Login;
