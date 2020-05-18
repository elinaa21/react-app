import React from 'react';

import { cn } from '../../modules/cn';

import './SendMessageForm.scss';

const SendMessageForm: React.FC = () => (
    <div className = {cn('message-form-container')}>
        <textarea className = {cn('message-form-container', 'text')} placeholder="Type your message" rows={3} />
        <span className = {cn('message-form-container', 'button')}>SEND</span>
    </div>
);

export default SendMessageForm;
