import React from 'react';
import { cn } from '../../modules/cn';

import './Message.scss';

const classNames = {
    messageDate: cn('message', 'date'),
    messageName: cn('message', 'name'),
};

interface IMessageProps {
    name: string;
    message: string;
    from?: 'me' | 'them';
}

const Message: React.FC<IMessageProps> = (props: IMessageProps) => (
    <div className={cn('message', '', {from: props.from})} >
        <div className={cn('message', 'info', {from: props.from})}>
            <span className={classNames.messageDate}>21:21, Today </span>
            <span className={classNames.messageName}>{props.name}</span>
        </div>
        <div className={cn('message', 'content', {from: props.from})}>{props.message}</div>
    </div>
);

export default Message;
