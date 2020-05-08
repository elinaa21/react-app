import React from 'react';
import ActiveUser from '../ActiveUser/ActiveUser.jsx';
import MessagesField from '../MessagesField/MessagesField.jsx';
import SendMessageForm from '../SendMessageForm/SendMessageForm.jsx';

import './ChatField.css';

const ChatField = () => (
    <div className = 'container-chat'>
        <ActiveUser name ='Игорек Уголек' messages ='105к'/>
        <MessagesField />
        <SendMessageForm />
    </div>
);

export default ChatField;
