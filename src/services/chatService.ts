import io from 'socket.io-client';


class ChatService {
    private socket = io.connect('http://localhost:777');

    constructor() {
        this.socket.emit('match', 'user');
        this.socket.on('chatMessage', (message: string) => console.log(message));
    }

    public sendMessage = (message: string): void => {
        this.socket.emit('chatMessage', message); // `[[${from}]][[${to}]]${this.state.msg}`
        
    };

}


export default new ChatService();