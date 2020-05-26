import React from 'react';

import { cn } from '../../modules/cn';

import './Login.scss';

const classNames = {
    login: cn('login'),
    loginForm: cn('login-form'),
    headLoginForm: cn('login-form', 'headline'),
    inputUsername: cn('input-username'),
    inputPassword: cn('input-password'),
    loginButton: cn('login', 'button'),
    noAccount: cn('no-account'),
    lineImg: cn('line-image'),
    buttonSignUp: cn('login-sign-up'),
};

const Login: React.FC = () => (
    <div className={classNames.login}>
        <div className={classNames.loginForm}>
            <h1 className={classNames.headLoginForm}>Log in</h1>
            <input type='text' placeholder='Username' className={classNames.inputUsername} />
                <input type='text' placeholder='Password' className={classNames.inputPassword} />
            <button className={classNames.loginButton}>Log in</button>
            <div className={classNames.noAccount}>
                <div className={classNames.lineImg} />
                <span>Have not account?</span>
                <div className={classNames.lineImg} />
            </div>
            <button className={classNames.buttonSignUp}>Sign up</button>
        </div>
    </div>
);

export default Login;
