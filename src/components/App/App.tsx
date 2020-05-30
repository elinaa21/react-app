import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Loader from '../Loader/Loader';
import Main from '../Main/Main';

import './App.scss';


const App: React.FC = () => (
    <BrowserRouter>
        <Route path="/im">
            <Main />
        </Route>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/loader' component={Loader}/>
    </BrowserRouter>
);

export default App;
