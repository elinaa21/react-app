import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ChatField from '../ChatField/ChatField';
import ContactsField from '../ContactsField/ContactsField';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Loader from '../Loader/Loader';
import { cn } from '../../modules/cn';

import './App.scss';

const App: React.FC = () => (
    <BrowserRouter>
        <Route exact path="/">
            <div className = {cn('background')}>
                <div className = {cn('chat')}>
                    <ContactsField />
                    <ChatField />
                    <div className = {cn('side')}>
                        <button className = {cn('exit')}>EXIT</button>
                        <span className = {cn('side', 'name')}>Elinaaa</span>
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
