import React from 'react';

import './Register.scss';
import { cn } from '../../modules/cn';

const classNames = {
    register: cn('register'),
    registerForm: cn('register-form'),
    headRegisterForm: cn('register-form', 'headline'),
    inputUsername: cn('input-username'),
    inputPassword: cn('input-password'),
    registerButton: cn('register', 'button'),
    hasAccount: cn('has-account'),
    lineImg: cn('line-image'),
    buttonLogin: cn('login-sign-up'),
};

const Register: React.FC = () => (
    <div className={classNames.register}>
        <div className={classNames.registerForm}>
            <h1 className={classNames.headRegisterForm}>Sign up</h1>
            <input type='text' placeholder='Username' className={classNames.inputUsername} />
            <input type='password' placeholder='Create password' className={classNames.inputPassword} />
            <input type='password' placeholder='Confirm password' className={classNames.inputPassword} />
            <button className={classNames.registerButton}>Sign up</button>
            <div className={classNames.hasAccount}>
                <div className={classNames.lineImg} />
                <span>Already have an account?</span>
                <div className={classNames.lineImg} />
            </div>
            <button className={classNames.buttonLogin}>Log in</button>
        </div>
    </div>
);

export default Register;
