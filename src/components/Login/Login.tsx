import React from 'react';

import { cn } from '../../modules/cn';
import authService from '../../services/authService';

import './Login.scss';
import { Redirect } from 'react-router-dom';

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

interface ILoginSate {
    isSuccess: boolean;
    redirectToSignUp: boolean;
}

class Login extends React.Component<{}, ILoginSate> {
    constructor(props: {}) {
        super(props);
        this.state = { isSuccess: false, redirectToSignUp: false };
    }

    private handleLogin = (): void => {
        const login = (document.getElementById('login__username') as HTMLInputElement).value;
        const password = (document.getElementById('login__password') as HTMLInputElement).value;
        authService.login(login, password)
            .then((response: Response) => {
                if (response.ok) {
                    this.setState({ isSuccess: true });
                } else {
                    this.setState({ isSuccess: false });
                }
            });
    }

    private handleSignUp = (): void => {
        this.setState({ redirectToSignUp: true });
    }

    render(): JSX.Element {
        return (
            this.state.isSuccess ? <Redirect to='/im' /> :
            this.state.redirectToSignUp ? <Redirect to='/register' /> :
            <>
                <div className={classNames.login}>
                    <div className={classNames.loginForm}>
                        <h1 className={classNames.headLoginForm}>Log in</h1>
                        <input 
                            type='text' 
                            placeholder='Username' 
                            className={classNames.inputUsername} 
                            id='login__username' 
                        />
                            <input 
                                type='password' 
                                placeholder='Password' 
                                className={classNames.inputPassword} 
                                id='login__password'
                            />
                        <button className={classNames.loginButton} onClick={this.handleLogin} >Log in</button>
                        <div className={classNames.noAccount}>
                            <div className={classNames.lineImg} />
                            <span>Have not account?</span>
                            <div className={classNames.lineImg} />
                        </div>
                        <button className={classNames.buttonSignUp} onClick={this.handleSignUp} >Sign up</button>
                    </div>
                </div>
            </>
        )
    }
}


export default Login;
