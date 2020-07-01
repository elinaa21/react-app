import React from 'react';
import { cn } from '../../modules/cn';
import { connect } from 'react-redux';

import { setCurrentTargetUser, IActionType, deleteUnreadMessage } from '../../redux/chat/actions';
import { IChatState } from '../../redux/chat/reducers';

import './Contact.scss';
import { Dispatch } from 'redux';

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
    currentTargetUser: string;
    unreadMessages: Array<string>;
    setCurrentTargetUser?: (currentTargetUser: string) => IActionType;
    deleteUnreadMessage?: (from: string) => IActionType;
}

class Contact extends React.Component<IContactProps & IContactReduxProps> {
    private setActiveUser = (): void => {
        const name = this.props.name;
        this.props.setCurrentTargetUser(name);
        if (this.props.unreadMessages.includes(name)) {
            this.props.deleteUnreadMessage(name);
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
    currentTargetUser: state.chat.currentTargetUser,
    unreadMessages: state.chat.unreadMessages
});

const mapDispatchToProps = (dispatch: Dispatch<IActionType>): {} => ({ 
    setCurrentTargetUser: (currentTargetUser: string): IActionType => dispatch(setCurrentTargetUser(currentTargetUser)),
    deleteUnreadMessage: (from: string): IActionType => dispatch(deleteUnreadMessage(from))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
