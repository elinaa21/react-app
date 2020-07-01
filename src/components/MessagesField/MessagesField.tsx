import React from 'react';

import Message from '../Message/Message';
import { cn } from '../../modules/cn';

import './MessagesField.scss';

const classNames = {
    containerMessages: cn('container-messages'),
};

const MessagesField: React.FC = () => (
    <div className={classNames.containerMessages}>
        <Message name='Elinaaa' message='Я очень сильно врать, как я сильно люблю Игоря' from='me' />
        <Message name='Elinaaa' message ='я не очень сильно люблю Игоря' from='me' />
        <Message name='Igorrrr' message ='я очень сильно люблю елину' from='them' />
        <Message name='Igorrrr' message ='я вообще сильно люблю елину!!!' from='them' />
    </div>
);

export default MessagesField;
