import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Register from '../../pages/Register/Register';
import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import { IAuthState } from '../../redux/auth/reducers';
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
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </BrowserRouter> 
    );
};

const mapStateToProps = (state: {auth: IAuthState}): IAppProps => ({
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, {})(App);
