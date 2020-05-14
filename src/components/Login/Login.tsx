import React from 'react';

import './Login.scss';

const Login = () => (
    <div className='login'>
        <div className='login-form'>
            <h1 className='login-form__headline'>Log in</h1>
            <input type='text' placeholder='Username' className='input-username' />
                <input type='text' placeholder='Password' className='input-password' />
            <button className='login-button'>Log in</button>
            <div className='no-account'>
                <div className='line-image' />
                <span>Have not account?</span>
                <div className='line-image' />
            </div>
            <button className='login-sign-up'>Sign up</button>
        </div>
    </div>
);

export default Login;
