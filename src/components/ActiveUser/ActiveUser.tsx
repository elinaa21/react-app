import React from 'react';

import './ActiveUser.scss';

interface ActiveUserProps {
    name: string;
    messages: number;
}

const ActiveUser = (props: ActiveUserProps) => (
    <div className ='active-user'>
        <div className='active-user__img' />
        <div className='active-user-info'>
            <span>Chat with {props.name}</span>
            <span className ='active-user-info__messages'> already {props.messages} messages</span>
        </div>
        <div className='star-img' />
    </div>
);

export default ActiveUser;
