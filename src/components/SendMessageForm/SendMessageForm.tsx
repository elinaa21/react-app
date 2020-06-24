import React from 'react';
import io from 'socket.io-client';

import { cn } from '../../modules/cn';

import './SendMessageForm.scss';

const socket = io.connect('http://localhost:777');
socket.emit('match', 'user');

const classNames = {
    messageFormContainer: cn('message-form-container'),
    messageFormContainerText: cn('message-form-container', 'text'),
    messageFormContainerButton: cn('message-form-container', 'button'),
};

interface ISendMessageFormState {
    msg: string;
    chat: Array<Record<string,string>>;
}

class SendMessageForm extends React.Component<{}, ISendMessageFormState> {
    constructor(props: {}) {
        super(props);
        this.state = { msg: '', chat: [] };
    }

    componentDidMount(): void {
        socket.on('chatMessage', ({ id, msg }: Record<string,string>) => {
          // Add new messages to existing messages in "chat"
          this.setState({
            chat: [...this.state.chat, { id, msg }]
          });
        });
    }

    onTextChange = (e: React.SyntheticEvent<EventTarget>): void => {
        this.setState({ msg: (e.target as HTMLInputElement).value });
    };

    onMessageSubmit = (): void => {
        socket.emit('chatMessage', this.state.msg); // `[[${from}]][[${to}]]${this.state.msg}`
        this.setState({ msg: '' });
    };

    render(): JSX.Element {
        return (
            <div className={classNames.messageFormContainer}>
                <textarea 
                    className={classNames.messageFormContainerText} 
                    placeholder="Type your message" 
                    rows={3}
                    onChange={(e): void => this.onTextChange(e)}
                    value={this.state.msg}
                />
                <span className={classNames.messageFormContainerButton} onClick={this.onMessageSubmit}>
                    SEND
                </span>
            </div>
        );
    }
}


export default SendMessageForm;
