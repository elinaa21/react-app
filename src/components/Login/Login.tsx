import React from 'react';
import { Redirect } from 'react-router-dom';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { cn } from '../../modules/cn';
import { required, maxLength25, minLength4, alphaNumeric } from '../../modules/validator';
import Input from '../Input/Input';
import { IChatState } from '../../redux/auth/reducers';
import { IActionType, loginThunk } from '../../redux/auth/actions';

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

interface ILoginState {
    isSuccess: boolean;
    redirectToSignUp: boolean;
}

interface ILoginProps {
    isAuth: boolean;
    isLoading: boolean;
    loginThunk?: (login: string, password: string) => void;
}

class Login extends React.Component<InjectedFormProps & ILoginProps, ILoginState> {
    constructor(props: InjectedFormProps & ILoginProps) {
        super(props);
        this.state = { isSuccess: false, redirectToSignUp: false };
    }

    private loginElement?: HTMLInputElement;
    private passwordElement?: HTMLInputElement;
    private login?: string;
    private password?: string;

    private handleLogin = (): void => {
        if (this.props.invalid) return;
        this.login = this.loginElement.value;
        this.password = this.passwordElement.value;
        this.props.loginThunk(this.login, this.password);
    }

    componentDidMount(): void {
        this.loginElement = this.loginElement ? 
            this.loginElement : 
            (document.getElementById('login__username') as HTMLInputElement);
        this.passwordElement = this.passwordElement ? 
            this.passwordElement :
            (document.getElementById('login__password') as HTMLInputElement);
    }

    private handleSignUp = (): void => {
        this.setState({ redirectToSignUp: true });
    }
    
    render(): JSX.Element {
        return (
            this.props.isAuth ? <Redirect to='/im' /> :
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

const mapStateToProps = (state: {auth: IChatState}): ILoginProps => ({
    isLoading: state.auth.isLoading,
    isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IChatState, {}, Action<IActionType>>): {} => ({ 
    loginThunk: (login: string, password: string): void => loginThunk(login, password, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginReduxForm);
