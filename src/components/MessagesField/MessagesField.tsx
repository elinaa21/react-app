import React from 'react';

import Message from '../Message/Message';

import './MessagesField.scss';

const MessagesField = () => (
    <div className = 'container-messages'>
        <Message name='Elinaaa' message='Игорек приф, смотре чаго я сделяль' from='me' />
        <Message name='Elinaaa' message ='я очень сильно люблю Игоря' from='me' />
        <Message name='Igorrrr' message ='я не очень сильно люблю елину' from='them' />
        <Message name='Igorrrr' message ='я не очень сильно люблю елину' from='them' />
    </div>
);

export default MessagesField;
