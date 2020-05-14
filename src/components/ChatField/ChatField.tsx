import React from 'react';

import ActiveUser from '../ActiveUser/ActiveUser';
import MessagesField from '../MessagesField/MessagesField';
import SendMessageForm from '../SendMessageForm/SendMessageForm';

import './ChatField.scss';

const ChatField = () => (
    <div className = 'container-chat'>
        <ActiveUser name ='Igorrrrr' messages = {105000} />
        <MessagesField />
        <SendMessageForm />
    </div>
);

export default ChatField;
