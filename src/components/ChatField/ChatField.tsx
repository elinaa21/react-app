import React from 'react';
import { connect } from 'react-redux';

import ActiveUser from '../ActiveUser/ActiveUser';
import MessagesField from '../MessagesField/MessagesField';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/chat/reducers';

import './ChatField.scss';

const classNames = {
    containerChat: cn('container-chat'),
    selectChat: cn('select-chat')
}

interface IChatFieldProps {
    activeUser: string;
}


const ChatField: React.FC<IChatFieldProps> = (props: IChatFieldProps) => {
    return (
            <div className={classNames.containerChat}>
                { props.activeUser ?
                    <>
                        <ActiveUser />
                        <MessagesField />
                        <SendMessageForm />
                    </>
                    :
                    <div className={classNames.selectChat}>Select a chat to start messaging</div>
                }
            </div>
    );
}
const mapStateToProps = (state: {chat: IChatState}): IChatFieldProps => ({
    activeUser: state.chat.currentTargetUser
});

export default connect(mapStateToProps)(ChatField);
