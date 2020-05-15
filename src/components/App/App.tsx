import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ChatField from '../ChatField/ChatField';
import ContactsField from '../ContactsField/ContactsField';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Loader from '../Loader/Loader';

import './App.scss';

const App = () => (
    <BrowserRouter>
        <Route exact path="/">
            <div className = 'background'>
                <div className = 'chat'>
                    <ContactsField />
                    <ChatField />
                    <div className='side'>
                        <button className='exit'>EXIT</button>
                        <span className='side__name'>Elinaaa</span>
                    </div>
                </div>
            </div>
        </Route>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/loader' component={Loader}/>
    </BrowserRouter>
);

export default App;
