import React from 'react';

import './SendMessageForm.scss';

const SendMessageForm = () => (
    <div className ='message-form-container'>
        <textarea className='message-form-container__text' placeholder="Ваше сообщение..." rows='3' />
        <span className ='message-form-container__button'>ОТПРАВИТЬ</span>
    </div>
);

export default SendMessageForm;
