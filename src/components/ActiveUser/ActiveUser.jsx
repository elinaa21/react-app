import React from 'react';
import ContactIcon from '../../icons/contact-icon.png';
import StarIcon from '../../icons/star-icon.png';

import './ActiveUser.css';

const ActiveUser = (props) => (
    <div className ='active-user'>
        <img src ={ContactIcon} className='active-user__img' />
        <div className='active-user-info'>
            <span>Чат с пользователем {props.name}</span>
            <span className ='active-user-info__messages'> всего {props.messages} сообщений</span>
        </div>
        <img src ={StarIcon} className='star-img' />
    </div>
);

export default ActiveUser;
