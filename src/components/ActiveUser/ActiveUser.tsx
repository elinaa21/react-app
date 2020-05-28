import React from 'react';
import { cn } from '../../modules/cn';

import './ActiveUser.scss';

const classNames = {
    activeUser: cn('active-user'),
    activeUserImg: cn('active-user', 'img'),
    activeUserInfo: cn('active-user', 'info'),
    activeUserMessages: cn('active-user', 'messages'),
    starImg: cn('star-img'),
}

interface ActiveUserProps {
    name: string;
    messages: number;
}

const ActiveUser: React.FC<ActiveUserProps> = (props: ActiveUserProps) => (
    <div className={classNames.activeUser}>
        <div className={classNames.activeUserImg} />
        <div className={classNames.activeUserInfo}>
            <span>Chat with {props.name}</span>
            <span className={classNames.activeUserMessages}> already {props.messages} messages</span>
        </div>
        <div className={classNames.starImg} />
    </div>
);

export default ActiveUser;
