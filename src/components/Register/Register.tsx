import React from 'react';

import './Register.scss';

const Register = () => (
    <div className='register'>
        <div className='register-form'>
            <h1 className='register-form__headline'>Sign up</h1>
            <input type='text' placeholder='Username' className='input-username' />
                <input type='text' placeholder='Password' className='input-password' />
            <button className='register-button'>Sign up</button>
            <div className='has-account'>
                <div className='line-image' />
                <span>Already have an account?</span>
                <div className='line-image' />
            </div>
            <button className='login-sign-up'>Log in</button>
        </div>
    </div>
);

export default Register;
