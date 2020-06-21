import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/auth/reducers';
import { IActionType, registerThunk } from '../../redux/auth/actions';
import { required, maxLength25, minLength4, alphaNumeric, matchPassword } from '../../modules/validator';
import Input from '../Input/Input';

import './Register.scss';

const classNames = {
    register: cn('register'),
    registerForm: cn('register-form'),
    headRegisterForm: cn('register-form', 'headline'),
    registerButton: cn('register', 'button'),
    hasAccount: cn('has-account'),
    lineImg: cn('line-image'),
    buttonLogin: cn('login-sign-up'),
    registerError: cn('register-error')
};

interface IRegisterState {
    redirectToLogin: boolean;
}

interface IRegisterProps {
    isAuth: boolean;
    registerError: boolean;
    registerThunk?: (login: string, password: string) => void;
}

class Register extends React.Component<InjectedFormProps & IRegisterProps, IRegisterState> {
    constructor(props: InjectedFormProps & IRegisterProps) {
        super(props);
        this.state = { redirectToLogin: false };
    }

    private loginElement?: HTMLInputElement;
    private passwordElement?: HTMLInputElement;
    private login?: string;
    private password?: string;

    componentDidMount(): void {
        this.loginElement = this.loginElement ? 
            this.loginElement : 
            (document.getElementById('register__username') as HTMLInputElement);
        this.passwordElement = this.passwordElement ? 
            this.passwordElement :
            (document.getElementById('register__password') as HTMLInputElement);
    }

    handleLogin = (): void => {
        this.setState({ redirectToLogin: true });
    }

    handleSignUp = (): void => {
        if (this.props.invalid) return;
        this.login = this.loginElement.value;
        this.password = this.passwordElement.value;
        this.props.registerThunk(this.login, this.password);
    }

    render(): JSX.Element {
        return (
            this.props.isAuth ? <Redirect to='/im' /> :
            this.state.redirectToLogin ? <Redirect to='/login' /> :
            <>
                <div className={classNames.register}>
                    <div className={classNames.registerForm}>
                        <h1 className={classNames.headRegisterForm}>Sign up</h1>
                        <div className={cn('register-error', '', {show: this.props.registerError})}>
                            register error
                        </div>
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

const mapStateToProps = (state: { auth: IChatState}): IRegisterProps => ({
    isAuth: state.auth.isAuth,
    registerError: state.auth.registerError
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IChatState, {}, Action<IActionType>>): {} => ({ 
    registerThunk: (login: string, password: string): void => registerThunk(login, password, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReduxForm);
