import React from 'react';
import { cn } from '../../modules/cn';

import './Contact.scss';

interface ContactProps {
    name: string;
    status: string;
}

const Contact: React.FC<ContactProps> = (props: ContactProps) => (
    <div className = {cn('contact')}>
        <div className = {cn('contact', 'img')}/>
        <div className = {cn('contact-info')}>
            <span>{ props.name }</span>
            <div className = {cn('contact-status')} >
                <div className = {cn('contact-status', 'img')} />
                <span>{ props.status }</span>
            </div>
        </div>
    </div>
);

export default Contact;
