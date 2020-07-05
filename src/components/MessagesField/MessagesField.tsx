import React from 'react';
import { connect } from 'react-redux';

import Message from '../Message/Message';
import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/chat/reducers';

import './MessagesField.scss';

const classNames = {
    containerMessages: cn('container-messages'),
};

interface IMessagesFieldProps {
    messages: Array<Record<string, string>>;
    count: number;
}

const MessagesField: React.FC<IMessagesFieldProps> = (props: IMessagesFieldProps) => {
    const allMessages = props.messages.map(msg => <Message key={msg.id} name={msg.from} message={msg.message} from='me' />);
    return (
        <div className={classNames.containerMessages}>
            { allMessages }
        </div>
    );
}

const mapStateToProps = (state: {chat: IChatState}): IMessagesFieldProps => ({
    messages: state.chat.messages,
    count: state.chat.count
});

export default connect(mapStateToProps)(MessagesField);
