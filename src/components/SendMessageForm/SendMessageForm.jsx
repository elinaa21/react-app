import React from 'react';

import './SendMessageForm.css';

const SendMessageForm = () => (
    <div className ='message-form-container'>
        <textarea className='message-form-container__text' placeholder="Ваше сообщение..." rows='3' />
        <span className ='message-form-container__send'>ОТПРАВИТЬ</span>
    </div>
);

export default SendMessageForm;
