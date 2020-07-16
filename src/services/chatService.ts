import io from 'socket.io-client';
import authService from '../services/authService'
import store from '../redux/store';
import { setUnreadMessage, setMessage, setDialog, setOnlineStatus } from '../redux/chat/actions';
import { dn } from '../modules/dn';

interface IMessagePayload {
    from: string;
    to: string;
    message: string;
}

class ChatService {
    private socket: SocketIOClient.Socket;

    public connect = (): void => {
        this.socket = io.connect('http://localhost:777');

        this.socket.on('chatMessage', (payload: IMessagePayload) => {
            if (payload.from !== store.getState().chat.currentTargetUser) {
                if (!store.getState().chat.unreadMessages.includes(payload.from)) {
                    store.dispatch(setUnreadMessage(payload.from));
                }
            }

            const dialogName = dn(payload.from, payload.to);
            if (!store.getState().chat.dialogs[dialogName]) {
                this.getMessages(payload.from)
                    .then(res => res.json())
                    .then(res => {
                        store.dispatch(setDialog(dialogName, res.messages));
                    })
            } else {
                store.dispatch(setMessage(payload.from, payload.to, payload.message));
            }
        });

        this.socket.on('who', () => {
            this.socket.emit('who', authService.userName);
        });

        this.socket.on('online', (userNameToid: Record<string, string>) => {
            store.dispatch(setOnlineStatus(Object.keys(userNameToid)));
        });
    };

    public setOffline = (): void => {
        this.socket.disconnect();
    };

    public sendMessage = (message: string, from: string, to: string): void => {
        const date = new Date();
        this.socket.emit('chatMessage', { from, to, message, date });
    };

    public getMessages = (target: string): Promise<Response> => {
        const url = `http://localhost:8000/api/messages?target=${target}`;
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: { Host: 'localhost' },
        };
        return fetch(url, options);
    };

    public getContacts = (): Promise<Response> => {
        const url = 'http://localhost:8000/api/contacts';
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: { Host: 'localhost' },
        };
        return fetch(url, options);
    };
}

export default new ChatService();
