import React from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import { cn } from '../../modules/cn';
import { required, maxLength25, minLength4, alphaNumeric } from '../../modules/validator';
import authService from '../../services/authService';
import Input from '../Input/Input';

import './Login.scss';

const classNames = {
    login: cn('login'),
    loginForm: cn('login-form'),
    headLoginForm: cn('login-form', 'headline'),
    loginButton: cn('login', 'button'),
    noAccount: cn('no-account'),
    lineImg: cn('line-image'),
    buttonSignUp: cn('login-sign-up'),
};

interface ILoginSate {
    isSuccess: boolean;
    redirectToSignUp: boolean;
}

class Login extends React.Component<InjectedFormProps, ILoginSate> {
    constructor(props: InjectedFormProps) {
        super(props);
        this.state = { isSuccess: false, redirectToSignUp: false };
    }

    private handleLogin = (): void => {
        if (this.props.invalid) return;
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
                    <div className={classNames.loginForm} >
                        <h1 className={classNames.headLoginForm}>Log in</h1>
                        <Field 
                            component={Input}
                            validate={[required, maxLength25, minLength4, alphaNumeric]}
                            type='text'
                            name='username'
                            placeholder='Username' 
                            id='login__username'
                        />
                        <Field
                            component={Input}
                            validate={[required, maxLength25, minLength4]}
                            type='password'
                            name='password'
                            placeholder='Password' 
                            id='login__password'
                        />
                        <button className={classNames.loginButton} onClick={this.handleLogin}>
                                Log in
                        </button>
                        <div className={classNames.noAccount}>
                            <div className={classNames.lineImg} />
                            <span>Have not account?</span>
                            <div className={classNames.lineImg} />
                        </div>
                        <button className={classNames.buttonSignUp} onClick={this.handleSignUp} >
                            Sign up
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(Login)

export default LoginReduxForm;
