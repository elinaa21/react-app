import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Register from '../Register/Register';
import Main from '../Main/Main';
import LoginReduxForm from '../Login/Login';
import { IChatState } from '../../redux/auth/reducers';
import Loader from '../Loader/Loader';

const redir = (): JSX.Element => <Redirect to='/im' />;

interface IAppProps {
    isLoading: boolean;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
    return (
        props.isLoading ? <Loader /> :
        <BrowserRouter>
            <Route path='/' component={redir} />
            <Route path='/im' component={Main} />
            <Route path='/login' component={LoginReduxForm} />
            <Route path='/register' component={Register} />
        </BrowserRouter> 
    );
};

const mapStateToProps = (state: {auth: IChatState}): IAppProps => ({
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, {})(App);
