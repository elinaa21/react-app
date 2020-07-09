import React from 'react';
import { connect } from 'react-redux';

import { cn } from '../../modules/cn';
import { dn } from '../../modules/dn';
import { IChatState } from '../../redux/chat/reducers';
import { IPayload } from '../../redux/chat/actions';
import authService from '../../services/authService';

import './ActiveUser.scss';

const classNames = {
    activeUser: cn('active-user'),
    activeUserImg: cn('active-user', 'img'),
    activeUserInfo: cn('active-user', 'info'),
    activeUserMessages: cn('active-user', 'messages'),
    starImg: cn('star-img'),
}


interface IActiveUserProps {
    name: string;
    dialogs: Record<string,Array<IPayload>>;
}

const ActiveUser: React.FC<IActiveUserProps> = (props: IActiveUserProps) => {
    const dialogName = dn(authService.userName, props.name);

    return (
        <div className={classNames.activeUser}>
            <div className={classNames.activeUserImg} />
            <div className={classNames.activeUserInfo}>
                <span>Chat with {props.name}</span>
                <span className={classNames.activeUserMessages}> 
                    already {props.dialogs[dialogName] ? props.dialogs[dialogName].length : 0} messages
                </span>
            </div>
            <div className={classNames.starImg} />
        </div>
    );
}

const mapStateToProps = (state: {chat: IChatState}): IActiveUserProps => ({
    name: state.chat.currentTargetUser,
    dialogs: state.chat.dialogs
});

export default connect(mapStateToProps)(ActiveUser);
