import React, { KeyboardEvent } from 'react';
import { connect } from 'react-redux';

import { cn } from '../../modules/cn';
import chatService from '../../services/chatService';
import authService from '../../services/authService';
import { IChatState } from '../../redux/chat/reducers';

import './SendMessageForm.scss';

const classNames = {
    messageFormContainer: cn('message-form-container'),
    messageFormContainerText: cn('message-form-container', 'text'),
    messageFormContainerButton: cn('message-form-container', 'button'),
};

interface ISendMessageFormState {
    message: string;
    disableButton: boolean;
}

interface ISendMessageFormProps {
    currentTargetUser: string;
}

class SendMessageForm extends React.Component<ISendMessageFormProps, ISendMessageFormState> {
    constructor(props: ISendMessageFormProps) {
        super(props);
        this.state = { message: '', disableButton: true };
    }

    onTextChange = (e: React.SyntheticEvent<EventTarget>): void => {
        const message = (e.target as HTMLInputElement).value;
        if (message.replace(/\s*/g, '')) {
            this.setState({ message, disableButton: false });
        } else {
            this.setState({ message, disableButton: true });
        }
    };

    onMessageSubmit = (): void => {
        if (this.state.message === '') return;
        chatService.sendMessage(this.state.message, authService.userName, this.props.currentTargetUser );
        this.setState({message: ''})
    }

    private handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onMessageSubmit();
        }
    }

    render(): JSX.Element {
        return (
            <div className={classNames.messageFormContainer}>
                <textarea 
                    className={classNames.messageFormContainerText} 
                    placeholder="Type your message" 
                    rows={3}
                    onChange={this.onTextChange}
                    value={this.state.message}
                    onKeyPress={this.handleKeyPress} 
                />
                <button disabled={this.state.disableButton} className={classNames.messageFormContainerButton} onClick={this.onMessageSubmit}>
                    SEND
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: {chat: IChatState}): ISendMessageFormProps => ({
    currentTargetUser: state.chat.currentTargetUser
})

export default connect(mapStateToProps)(SendMessageForm);
