import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ChatField from '../ChatField/ChatField';
import ContactsField from '../ContactsField/ContactsField';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Loader from '../Loader/Loader';
import { cn } from '../../modules/cn';

import './App.scss';

const classNames = {
    background: cn('background'),
    chat: cn('chat'),
    side: cn('side'),
    buttonExit: cn('exit'),
    sideName: cn('side', 'name'),
}

const App: React.FC = () => (
    <BrowserRouter>
        <Route path="/im">
            <div className={classNames.background}>
                <div className={classNames.chat}>
                    <ContactsField />
                    <ChatField />
                    <div className={classNames.side}>
                        <button className={classNames.buttonExit}>EXIT</button>
                        <span className={classNames.sideName}>Elinaaa</span>
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
