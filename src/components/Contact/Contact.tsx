import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setCurrentTargetUser, IActionType, deleteUnreadMessage, setDialog, IPayload } from '../../redux/chat/actions';
import { IChatState } from '../../redux/chat/reducers';
import { cn } from '../../modules/cn';
import { dn } from '../../modules/dn';
import chatService from '../../services/chatService';
import authService from '../../services/authService';

import './Contact.scss';

const classNames = {
    contact: cn('contact'),
    contactImg: cn('contact', 'img'),
    contactInfo: cn('contact-info'),
    contactStatus: cn('contact-status'),
    unreadMessage: cn('unread-message'),
}

interface IContactProps {
    name: string;
    status: string;
    unreadMessages: boolean;
}

interface IContactReduxProps {
    dialogs: Record<string,Array<IPayload>>;
    currentTurgetUser: string;
    setCurrentTargetUser?: (currentTargetUser: string) => IActionType;
    deleteUnreadMessage?: (from: string) => IActionType;
    setDialog?: (userName: string, messages: Array<Record<string, string>>) => IActionType;
}

class Contact extends React.Component<IContactProps & IContactReduxProps> {
    private activeUser: boolean;

    private setActiveUser = (): void => {
        const name = this.props.name;
        this.props.setCurrentTargetUser(name);

        if (this.props.unreadMessages) {
            this.props.deleteUnreadMessage(name);
        }

        const dialogName = dn(authService.userName, name);
        if (!this.props.dialogs[dialogName]) {
            chatService.getMessages(name)
                .then(res => res.json())
                .then(res => {
                    this.props.setDialog(dialogName, res.messages);
                });
        }
    }

    render(): JSX.Element {
        this.activeUser = this.props.currentTurgetUser === this.props.name ? true : false;
        return (
            <div className={cn('contact', '', {active: this.activeUser})} onClick={this.setActiveUser}>
                <div className = {classNames.contactImg}/>
                <div className={classNames.contactInfo}>
                    <span>{ this.props.name }</span>
                    <div className={classNames.contactStatus} >
                        <div className={cn('contact-status', 'img', {status: this.props.status})} />
                        <span>{ this.props.status }</span>
                    </div>
                </div>
                { this.props.unreadMessages && 
                    <div className={classNames.unreadMessage} /> }
            </div>
        );
    }
}

const mapStateToProps = (state: {chat: IChatState}): IContactReduxProps => ({
    dialogs: state.chat.dialogs,
    currentTurgetUser: state.chat.currentTargetUser
});

const mapDispatchToProps = (dispatch: Dispatch<IActionType>): {} => ({ 
    setCurrentTargetUser: (currentTargetUser: string): IActionType => dispatch(setCurrentTargetUser(currentTargetUser)),
    deleteUnreadMessage: (from: string): IActionType => dispatch(deleteUnreadMessage(from)),
    setDialog: (userName: string, messages: Array<Record<string, string>>): IActionType => dispatch(setDialog(userName, messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
