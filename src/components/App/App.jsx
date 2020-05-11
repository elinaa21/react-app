import React from 'react';
import ChatField from '../ChatField/ChatField.jsx';
import ContactsField from '../ContactsField/ContactsField.jsx';
import './App.scss';

const App = () => (
    <div className = 'background'>
        <div className = 'chat'>
        <ContactsField />
        <ChatField />
        <button className='exit'>ВЫЙТИ</button>
        </div>
    </div>
);

export default App;
