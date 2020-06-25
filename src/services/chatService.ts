import io from 'socket.io-client';


const socket = io.connect('http://localhost:777');
socket.emit('match', 'user');
socket.on('chatMessage', (message: string) => console.log(message));

class ChatService {

    public sendMessage = (message: string): void => {
        socket.emit('chatMessage', message); // `[[${from}]][[${to}]]${this.state.msg}`
        
    };

}



export default new ChatService();