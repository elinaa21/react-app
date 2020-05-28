import React from 'react';

import { cn } from '../../modules/cn';

import './SendMessageForm.scss';

const classNames = {
    messageFormContainer: cn('message-form-container'),
    messageFormContainerText: cn('message-form-container', 'text'),
    messageFormContainerButton: cn('message-form-container', 'button'),
};

const SendMessageForm: React.FC = () => (
    <div className={classNames.messageFormContainer}>
        <textarea className={classNames.messageFormContainerText} placeholder="Type your message" rows={3} />
        <span className={classNames.messageFormContainerButton}>SEND</span>
    </div>
);

export default SendMessageForm;
