import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import Message from '../Message/Message';
import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/chat/reducers';
import { IPayload } from '../../redux/chat/actions';
import authService from '../../services/authService';

import './MessagesField.scss';

const classNames = {
    containerMessages: cn('container-messages'),
};

interface IMessagesFieldProps {
    dialogs: Record<string,Array<IPayload>>;
    currentTargetUser: string;
}


const MessagesField: React.FC<IMessagesFieldProps> = (props: IMessagesFieldProps) => {
    let allMessages = null;
    const dialogName = authService.userName < props.currentTargetUser ? 
            `${authService.userName}-${props.currentTargetUser}`:
            `${props.currentTargetUser}-${authService.userName}`;
    if (props.dialogs[dialogName]) {
        allMessages = props.dialogs[dialogName].map(msg => 
            <Message 
                key={msg._id} 
                name={msg.from} 
                message={msg.message} 
                from={msg.from === props.currentTargetUser ? 'them' : 'me'}
                date={msg.date.slice(0, 16).replace('T', ' ')}
            />
        );
    }
    
    const messagesEndRef = useRef(null)
    const scrollToBottom = (): void => {
        messagesEndRef.current && messagesEndRef.current.scrollIntoView();
    };
    useEffect( () => {
        scrollToBottom()
    }, [allMessages]);

    return (
        <div className={classNames.containerMessages} >
            { allMessages }
            <div ref={messagesEndRef}></div>
        </div>
    );
}

const mapStateToProps = (state: {chat: IChatState}): IMessagesFieldProps => ({
    dialogs: state.chat.dialogs,
    currentTargetUser: state.chat.currentTargetUser
});

export default connect(mapStateToProps)(MessagesField);
