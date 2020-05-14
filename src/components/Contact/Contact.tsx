import React from 'react';

import './Contact.scss';

interface ContactProps {
    name: string;
    status: string;
}

const Contact = (props: ContactProps) => (
    <div className = 'contact'>
        <div className='contact__img'/>
        <div className='contact-info'>
            <span>{ props.name }</span>
            <div className='contact-status' >
                <div className='contact-status__img' />
                <span>{ props.status }</span>
            </div>
        </div>
    </div>
);

export default Contact;
