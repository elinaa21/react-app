import React from 'react';

import ActiveUser from '../ActiveUser/ActiveUser';
import MessagesField from '../MessagesField/MessagesField';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { cn } from '../../modules/cn';

import './ChatField.scss';

const classNames = {
    containerChat: cn('container-chat'),
}

const ChatField: React.FC = () => (
    <div className={classNames.containerChat}>
        <ActiveUser name ='Igorrrrr' messages = {105000} />
        <MessagesField />
        <SendMessageForm />
    </div>
);

export default ChatField;
