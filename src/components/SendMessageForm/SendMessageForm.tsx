import React from 'react';

import './SendMessageForm.scss';

const SendMessageForm = () => (
    <div className ='message-form-container'>
        <textarea className='message-form-container__text' placeholder="Type your message" rows={3} />
        <span className ='message-form-container__button'>SEND</span>
    </div>
);

export default SendMessageForm;
