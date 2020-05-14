import React from 'react';

import './MessageFromThem.scss';

interface IMessageProps {
    name: string;
    message: string;
}

const MessageFromThem = (props: IMessageProps) => (
    <div className = 'from-them'>
        <div>
            <span className = 'message-name'>{props.name}</span>
            <span className = 'message-date'> 21:21, Today</span>
        </div>
        <div className ='from-them__content'>{props.message}</div>
    </div>
);

export default MessageFromThem;
