import io from 'socket.io-client';
import authService from '../services/authService'


class ChatService {
    private socket = io.connect('http://localhost:777');

    constructor() {
        this.socket.on('chatMessage', (message: string) => console.log(message));
        this.socket.on('who', () => this.socket.emit('who', authService.userName));
    }

    public matchUserName = (userName: string): void => {
        this.socket.emit('match', userName);
    }

    public sendMessage = (message: string, from: string, to: string): void => {
        console.log(from);
        this.socket.emit('chatMessage', { from, to, message });
    };
}


export default new ChatService();