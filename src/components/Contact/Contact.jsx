import React from 'react';
import ContactIcon from '../../icons/contact-icon.png';
import OnlineIcon from '../../icons/online-icon.png';
import './Contact.css';

const Contact = (props) => (
    <div className = 'contact'>
        <img src ={ContactIcon} className='contact__img'/>
        <div className='contact-info'>
            <span>{ props.name }</span>
            <div className='contact-status' >
                <img src={OnlineIcon} className='contact-status__img' />
                <span>{ props.status }</span>
            </div>
        </div>
    </div>
);

export default Contact;
