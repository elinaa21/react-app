import React from 'react';
import { cn } from '../../modules/cn';

import './Contact.scss';

const classNames = {
    contact: cn('contact'),
    contactImg: cn('contact', 'img'),
    contactInfo: cn('contact-info'),
    contactStatus: cn('contact-status'),
    contactStatusImg: cn('contact-status', 'img'),
}

interface ContactProps {
    name: string;
    status: string;
}

const Contact: React.FC<ContactProps> = (props: ContactProps) => (
    <div className={classNames.contact}>
        <div className = {classNames.contactImg}/>
        <div className={classNames.contactInfo}>
            <span>{ props.name }</span>
            <div className={classNames.contactStatus} >
                <div className={classNames.contactStatusImg} />
                <span>{ props.status }</span>
            </div>
        </div>
    </div>
);

export default Contact;
