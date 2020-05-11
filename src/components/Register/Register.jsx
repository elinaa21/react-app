import React from 'react';
import Line from '../../img/line.png';

import './Register.scss';

const Register = () => (
    <div className='register'>
        <div className='register-form'>
            <h1 className='register-form__headline'>Sign up</h1>
            <input type='text' placeholder='Username' className='input-username' />
                <input type='text' placeholder='Password' className='input-password' />
            <button className='register-button'>Sign up</button>
            <div className='has-account'>
                <img src={Line} />
                <span>Already have an account?</span>
                <img src={Line} />
            </div>
            <button className='login-sign-up'>Log in</button>
        </div>
    </div>
);

export default Register;
