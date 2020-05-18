import React from 'react';

import { cn } from '../../modules/cn';

import './Login.scss';

const Login: React.FC = () => (
    <div className = {cn('login')}>
        <div className = {cn('login-form')}>
            <h1 className = {cn('login-form', 'headline')}>Log in</h1>
            <input type='text' placeholder='Username' className = {cn('input-username')} />
                <input type='text' placeholder='Password' className = {cn('input-password')} />
            <button className = {cn('login', 'button')}>Log in</button>
            <div className = {cn('no-account')}>
                <div className = {cn('line-image')} />
                <span>Have not account?</span>
                <div className = {cn('line-image')} />
            </div>
            <button className = {cn('login-sign-up')}>Sign up</button>
        </div>
    </div>
);

export default Login;
