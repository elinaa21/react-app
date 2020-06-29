import React from 'react';
import { cn } from '../../modules/cn';
import { connect } from 'react-redux';

import { setCurrentTargetUser, IActionType } from '../../redux/chat/actions';
import { IChatState } from '../../redux/chat/reducers';

import './Contact.scss';
import { Dispatch } from 'redux';

const classNames = {
    contact: cn('contact'),
    contactImg: cn('contact', 'img'),
    contactInfo: cn('contact-info'),
    contactStatus: cn('contact-status'),
    contactStatusImg: cn('contact-status', 'img'),
}

interface IContactProps {
    name: string;
    status: string;
}

interface IContactReduxProps {
    currentTargetUser: string;
    setCurrentTargetUser?: (currentTargetUser: string) => IActionType;
}

class Contact extends React.Component<IContactProps & IContactReduxProps> {
    private setActiveUser = (): void => {
        const name = this.props.name;
        this.props.setCurrentTargetUser(name);
        console.log(this.props.currentTargetUser);
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
            </div>
        );
    }
}

const mapStateToProps = (state: {chat: IChatState}): IContactReduxProps => ({
    currentTargetUser: state.chat.currentTargetUser,
});

const mapDispatchToProps = (dispatch: Dispatch<IActionType>): {} => ({ 
    setCurrentTargetUser: (currentTargetUser: string): IActionType => dispatch(setCurrentTargetUser(currentTargetUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
