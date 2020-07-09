import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setCurrentTargetUser, IActionType, deleteUnreadMessage, setDialog, IPayload } from '../../redux/chat/actions';
import { IChatState } from '../../redux/chat/reducers';
import { cn } from '../../modules/cn';
import chatService from '../../services/chatService';
import authService from '../../services/authService';

import './Contact.scss';

const classNames = {
    contact: cn('contact'),
    contactImg: cn('contact', 'img'),
    contactInfo: cn('contact-info'),
    contactStatus: cn('contact-status'),
    contactStatusImg: cn('contact-status', 'img'),
    unreadMessage: cn('unread-message'),
}

interface IContactProps {
    name: string;
    status: string;
}

interface IContactReduxProps {
    unreadMessages: Array<string>;
    dialogs: Record<string,Array<IPayload>>;
    setCurrentTargetUser?: (currentTargetUser: string) => IActionType;
    deleteUnreadMessage?: (from: string) => IActionType;
    setDialog?: (userName: string, messages: Array<Record<string, string>>) => IActionType;
}

class Contact extends React.Component<IContactProps & IContactReduxProps> {
    private setActiveUser = (): void => {
        const name = this.props.name;
        this.props.setCurrentTargetUser(name);
        if (this.props.unreadMessages.includes(name)) {
            this.props.deleteUnreadMessage(name);
        }

        const dialogName = authService.userName < name ? 
            `${authService.userName}-${name}` 
            : `${name}-${authService.userName}`;
        if (!this.props.dialogs[dialogName]) {
            chatService.getMessages(name)
            .then(res => res.json())
            .then(res => {
                this.props.setDialog(dialogName, res.messages);
            });
        }
    }

    render(): JSX.Element {
        return (
            <div className={classNames.contact} onClick={this.setActiveUser}>
                <div className = {classNames.contactImg}/>
                <div className={classNames.contactInfo}>
                    <span>{ this.props.name }</span>
                    <div className={classNames.contactStatus} >
                        <div className={classNames.contactStatusImg} />
                        <span>{ this.props.status }</span>
                    </div>
                </div>
                { this.props.unreadMessages.includes(this.props.name) ? 
                    <div className={classNames.unreadMessage} /> : <></> }
            </div>
        );
    }
}

const mapStateToProps = (state: {chat: IChatState}): IContactReduxProps => ({
    unreadMessages: state.chat.unreadMessages,
    dialogs: state.chat.dialogs
});

const mapDispatchToProps = (dispatch: Dispatch<IActionType>): {} => ({ 
    setCurrentTargetUser: (currentTargetUser: string): IActionType => dispatch(setCurrentTargetUser(currentTargetUser)),
    deleteUnreadMessage: (from: string): IActionType => dispatch(deleteUnreadMessage(from)),
    setDialog: (userName: string, messages: Array<Record<string, string>>): IActionType => dispatch(setDialog(userName, messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
