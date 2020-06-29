import React from 'react';
import { connect } from 'react-redux';

import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/chat/reducers';

import './ActiveUser.scss';

const classNames = {
    activeUser: cn('active-user'),
    activeUserImg: cn('active-user', 'img'),
    activeUserInfo: cn('active-user', 'info'),
    activeUserMessages: cn('active-user', 'messages'),
    starImg: cn('star-img'),
}

interface ActiveUserProps {
    messages: number;
}

interface IActiveUserReduxProps {
    name: string;
}

const ActiveUser: React.FC<ActiveUserProps> = (props: ActiveUserProps & IActiveUserReduxProps) => (
    <div className={classNames.activeUser}>
        <div className={classNames.activeUserImg} />
        <div className={classNames.activeUserInfo}>
            <span>Chat with {props.name}</span>
            <span className={classNames.activeUserMessages}> already {props.messages} messages</span>
        </div>
        <div className={classNames.starImg} />
    </div>
);

const mapStateToProps = (state: {chat: IChatState}): IActiveUserReduxProps => ({
    name: state.chat.currentTargetUser
});

export default connect(mapStateToProps)(ActiveUser);
