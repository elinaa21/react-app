import React from 'react';
import { cn } from '../../modules/cn';

import './ActiveUser.scss';

interface ActiveUserProps {
    name: string;
    messages: number;
}

const ActiveUser: React.FC<ActiveUserProps> = (props: ActiveUserProps) => (
    <div className = {cn('active-user')}>
        <div className = {cn('active-user', 'img')} />
        <div className = {cn('active-user', 'info')}>
            <span>Chat with {props.name}</span>
            <span className = {cn('active-user', 'messages')}> already {props.messages} messages</span>
        </div>
        <div className = {cn('star-img')} />
    </div>
);

export default ActiveUser;
