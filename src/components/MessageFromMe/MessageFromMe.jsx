import React from 'react';
import './MessageFromMe.scss';

const MessageFromMe = (props) => (
    <div className = 'from-me'>
        <div>
            <span className = 'message-date'>21:21, cегодня </span>
            <span className = 'message-name'>{props.name}</span>
        </div>
        <div className ='from-me__content'>{props.message}</div>
    </div>
);

export default MessageFromMe;
