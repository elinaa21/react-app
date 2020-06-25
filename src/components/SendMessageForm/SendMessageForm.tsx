import React, { KeyboardEvent } from 'react';

import { cn } from '../../modules/cn';
import chatService from '../../services/chatService'

import './SendMessageForm.scss';

const classNames = {
    messageFormContainer: cn('message-form-container'),
    messageFormContainerText: cn('message-form-container', 'text'),
    messageFormContainerButton: cn('message-form-container', 'button'),
};

interface ISendMessageFormState {
    message: string;
    chat: Array<Record<string,string>>;
}

class SendMessageForm extends React.Component<{}, ISendMessageFormState> {
    constructor(props: {}) {
        super(props);
        this.state = { message: '', chat: [] };
    }

    onTextChange = (e: React.SyntheticEvent<EventTarget>): void => {
        this.setState({ message: (e.target as HTMLInputElement).value });
    };

    onMessageSubmit = (): void => {
        if (this.state.message === '') return;
        chatService.sendMessage(this.state.message);
        this.setState({message: ''})
    }

    private handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onMessageSubmit();
        }
    }

    render(): JSX.Element {
        console.log(this.state.message);
        return (
            <div className={classNames.messageFormContainer}>
                <textarea 
                    className={classNames.messageFormContainerText} 
                    placeholder="Type your message" 
                    rows={3}
                    onChange={(e): void => this.onTextChange(e)}
                    value={this.state.message}
                    onKeyPress={this.handleKeyPress} 
                />
                <span className={classNames.messageFormContainerButton} onClick={this.onMessageSubmit}>
                    SEND
                </span>
            </div>
        );
    }
}


export default SendMessageForm;
