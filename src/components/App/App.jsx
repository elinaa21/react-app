import React from 'react';
import ChatField from '../ChatField/ChatField.jsx';
import ContactsField from '../ContactsField/ContactsField.jsx';
import './App.scss';

const App = () => (
    <div className = 'background'>
        <div className = 'chat'>
        <ContactsField />
        <ChatField />
        </div>
    </div>
);

export default App;
