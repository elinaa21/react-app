import React from 'react';

import Message from '../Message/Message';

import './MessagesField.scss';

const MessagesField = () => (
    <div className = 'container-messages'>
        <Message name='Elinaaa' message='Игорек приф, смотре чаго я сделяль' from='me' />
        <Message name='Elinaaa' message ='я люблю Игоря' from='me' />
    </div>
);

export default MessagesField;
