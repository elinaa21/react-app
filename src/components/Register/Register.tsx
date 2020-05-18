import React from 'react';

import './Register.scss';
import { cn } from '../../modules/cn';

const Register: React.FC = () => (
    <div className = {cn('register')}>
        <div className = {cn('register-form')}>
            <h1 className = {cn('register-form', 'headline')}>Sign up</h1>
            <input type='text' placeholder='Username' className = {cn('input-username')} />
                <input type='text' placeholder='Password' className = {cn('input-password')} />
            <button className = {cn('register', 'button')}>Sign up</button>
            <div className = {cn('has-account')}>
                <div className = {cn('line-image')} />
                <span>Already have an account?</span>
                <div className = {cn('line-image')} />
            </div>
            <button className = {cn('login-sign-up')}>Log in</button>
        </div>
    </div>
);

export default Register;
