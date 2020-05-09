import React from 'react';

import './MessageFromThem.css';

const MessageFromThem = (props) => (
    <div className = 'from-them'>
        <div>
            <span className = 'message-name'>{props.name}</span>
            <span className = 'message-date'> 21:21, cегодня</span>
        </div>
        <div className ='from-them__content'>{props.message}</div>
    </div>
);

export default MessageFromThem;
