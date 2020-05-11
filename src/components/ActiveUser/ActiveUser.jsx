import React from 'react';

import ContactIcon from '../../img/contact-icon.png';
import StarIcon from '../../img/star-icon.png';

import './ActiveUser.scss';

const ActiveUser = (props) => (
    <div className ='active-user'>
        <img src ={ContactIcon} className='active-user__img' />
        <div className='active-user-info'>
            <span>Chat with {props.name}</span>
            <span className ='active-user-info__messages'> already {props.messages} messages</span>
        </div>
        <img src ={StarIcon} className='star-img' />
    </div>
);

export default ActiveUser;
