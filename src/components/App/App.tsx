import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Register from '../Register/Register';
import Loader from '../Loader/Loader';
import Main from '../Main/Main';
import LoginReduxForm from '../Login/Login';

const redir = (): JSX.Element => <Redirect to='/im' />;

const App: React.FC = () => (
    <BrowserRouter>
        <Route path='/' component={redir} />
        <Route path='/im' component={Main} />
        <Route path='/login' component={LoginReduxForm} />
        <Route path='/register' component={Register} />
        <Route path='/loader' component={Loader} />
    </BrowserRouter>
);

export default App;
