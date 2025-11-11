import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, initializeFirebaseApp, signInWithEmailAndPassword, signInWithGoogle, signOutUser } from './loginManager';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });
    const [, setLoggedInUser] = useContext(UserContext);
    initializeFirebaseApp();
    
    const location = useLocation();

    const from = location.state || {from: '/'}
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(res => {
            handleResponse(res, true);
        })
    }

    const handleChange = (event) => {
        let isValid = true;
        if (event.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.password === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isContainNumber = /\d{1}/.test(event.target.value);
            isValid = isPasswordValid && isContainNumber;
        }
        if (isValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.name && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        console.log('object', user);
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true)
            })
        }
        event.preventDefault();
    }

    const handleSignOut = () => {
        signOutUser()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, isNavigate) => {
        setUser(res);
        setLoggedInUser(res);
        if(isNavigate){
            navigate(from.from);
        }
    }
    
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ?
                    <button onClick={handleSignOut}>Sign Out</button>
                    :
                    <button onClick={handleGoogleSignIn}>Sign In</button>
            }
            <br />
            <button>Sign In Using Facebook</button>
            <h1>Our Own Authentication</h1>
            <input type="checkbox" id='newUser' onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser">New User Sign Up</label>

            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type='text' name='name' placeholder='Enter Your Name' onChange={handleChange} />
                }
                <br />
                <input onChange={handleChange} type='email' name='email' placeholder='Your Email Address' />
                <br />
                <input onChange={handleChange} type='password' name='password' placeholder='Your Password' />
                <br />
                <button >Sign In</button>
            </form>
        </div>
    );
};

export default Login;