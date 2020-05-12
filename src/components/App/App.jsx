import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ChatField from '../ChatField/ChatField.jsx';
import ContactsField from '../ContactsField/ContactsField.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Loader from '../Loader/Loader.jsx';

import './App.scss';

const App = () => (
    <BrowserRouter>
        <Route exact path="/">
            <div className = 'background'>
                <div className = 'chat'>
                    <ContactsField />
                    <ChatField />
                    <button className='exit'>EXIT</button>
                </div>
            </div>
        </Route>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/loader' component={Loader}/>
    </BrowserRouter>
);

export default App;
