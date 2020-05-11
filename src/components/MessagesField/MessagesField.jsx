import React from 'react';
import MessageFromMe from '../MessageFromMe/MessageFromMe.jsx';
import MessageFromThem from '../MessageFromThem/MessageFromThem.jsx';

import './MessagesField.scss';

const MessagesField = () => (
    <div className = 'container-messages'>
        <MessageFromMe name='Элина' message ='Игорек приф, смотре чаго я сделяль'/>
        <MessageFromMe name='Элина' message ='это огромное сообщение сейчас я вот пишу такая вот да чтобы показать тебе как сильно я тебя обожаю а не для того чтобы тебе показать как выглядят большие сообщения понятно да все люблю тебя очень сладкий'/>
        <MessageFromThem name='Игорек Уголек' message ='елина не мешай а'/>
        <MessageFromThem name='Игорек Уголек' message ='я тебя все равно не оч люблю'/>
        <MessageFromThem name='Игорек Уголек' message ='пока'/>
    </div>
);

export default MessagesField;
