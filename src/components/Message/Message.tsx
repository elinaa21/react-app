import React from 'react';
import { cn } from '../../modules/cn';

import './Message.scss';

interface IMessageProps {
    name: string;
    message: string;
    from?: 'me' | 'them';
}

const Message = (props: IMessageProps) => (
    <div className = {cn('message', '', {from: 'me'})} >
        <div className = {cn('message', 'info', {from: 'me'})}>
            <span className = {cn('message', 'date', {from: 'me'})}>21:21, Today </span>
            <span className = {cn('message', 'name', {from: 'me'})}>{props.name}</span>
        </div>
        <div className = {cn('message', 'content', {from: 'me'})}>{props.message}</div>
    </div>
);

export default Message;
