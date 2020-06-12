import React from 'react';
import { Redirect } from 'react-router-dom';

import { cn } from '../../modules/cn';
import authService from '../../services/authService';

import './Register.scss';

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
    incorrectPassword: cn('incorrect'),
};

interface IRegisterState {
    isSuccess: boolean;
    redirectToLogin: boolean;
}

class Register extends React.Component<{}, IRegisterState> {
    constructor(props = {}) {
        super(props);
        this.state = { isSuccess: false, redirectToLogin: false };
    }

    handleLogin = (): void => {
        this.setState({ redirectToLogin: true });
    }

    handleSignUp = (): void => {
        const login = (document.getElementById('register__username') as HTMLInputElement).value;
        const password = (document.getElementById('register__password') as HTMLInputElement).value;
        const passwordRepeat = (document.getElementById('register__password_repeat') as HTMLInputElement).value;
        if (password === passwordRepeat) {
            authService.register(login, password)
            .then((response: Response) => {
                if (response.ok) {
                    this.setState({ isSuccess: true });
                } else {
                    this.setState({ isSuccess: false });
                }
            });
        } else {
            
            const incorrectLabel = document.getElementById('incorrect-label');
            incorrectLabel.style.display = 'block';
        }
    }

    render(): JSX.Element {
        return (
            this.state.isSuccess ? <Redirect to='/im' /> :
            this.state.redirectToLogin ? <Redirect to='/login' /> :
            <>
                <div className={classNames.register}>
                    <div className={classNames.registerForm}>
                        <h1 className={classNames.headRegisterForm}>Sign up</h1>
                        <input 
                            type='text' 
                            placeholder='Username'
                            id='register__username'
                            name='username'
                        />
                        <input 
                            type='password' 
                            placeholder='Create password'
                            id='register__password'
                            name='password'
                        />
                        <input 
                            type='password' 
                            placeholder='Confirm password' 
                            className={classNames.inputPassword}
                            id='register__password_repeat'
                            name='password' 
                        />
                        <span 
                            className={classNames.incorrectPassword} 
                            id='incorrect-label' >
                                Password is incorrect
                        </span>
                        <button className={classNames.registerButton} onClick={this.handleSignUp} >Sign up</button>
                        <div className={classNames.hasAccount}>
                            <div className={classNames.lineImg} />
                            <span>Already have an account?</span>
                            <div className={classNames.lineImg} />
                        </div>
                        <button className={classNames.buttonLogin} onClick={this.handleLogin} >Log in</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Register;
