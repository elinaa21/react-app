import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import { cn } from '../../modules/cn';
import authService from '../../services/authService';
import { required, maxLength25, minLength4, alphaNumeric, matchPassword } from '../../modules/validator';
import Input from '../Input/Input';

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
};

interface IRegisterState {
    isSuccess: boolean;
    redirectToLogin: boolean;
}

class Register extends React.Component<InjectedFormProps, IRegisterState> {
    constructor(props: InjectedFormProps) {
        super(props);
        this.state = { isSuccess: false, redirectToLogin: false };
    }

    handleLogin = (): void => {
        this.setState({ redirectToLogin: true });
    }

    handleSignUp = (): void => {
        if (this.props.invalid) return;
        const login = (document.getElementById('register__username') as HTMLInputElement).value;
        const password = (document.getElementById('register__password') as HTMLInputElement).value;
        authService.register(login, password)
        .then((response: Response) => {
            if (response.ok) {
                this.setState({ isSuccess: true });
            } else {
                this.setState({ isSuccess: false });
            }
        });
    }

    render(): JSX.Element {
        return (
            this.state.isSuccess ? <Redirect to='/im' /> :
            this.state.redirectToLogin ? <Redirect to='/login' /> :
            <>
                <div className={classNames.register}>
                    <div className={classNames.registerForm}>
                        <h1 className={classNames.headRegisterForm}>Sign up</h1>
                        <Field 
                            component={Input}
                            type='text' 
                            placeholder='Username'
                            id='register__username'
                            name='username'
                            validate={[required, maxLength25, minLength4, alphaNumeric]}
                        />
                        <Field 
                            component={Input}
                            type='password' 
                            placeholder='Create password'
                            id='register__password'
                            name='password'
                            validate={[required, maxLength25, minLength4]}
                        />
                        <Field 
                            component={Input}
                            type='password' 
                            placeholder='Confirm password' 
                            className={classNames.inputPassword}
                            name='passwordConfirm' 
                            validate={[required, maxLength25, minLength4, matchPassword]}
                        />
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

const RegisterReduxForm = reduxForm({
    form: 'register'
})(Register)

export default RegisterReduxForm;
