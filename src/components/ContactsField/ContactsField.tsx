import React from 'react';

import Search from '../Search/Search';
import Contact from '../Contact/Contact';
import { cn } from '../../modules/cn';

import './ContactsField.scss';

const ContactsField: React.FC = () => (
    <div className = {cn('container-contacts')}>
        <Search />
        <div style={{ height: '10%' }}></div>
        <Contact name='Ellie' status ='online' />
        <Contact name='Igorrrr' status ='online' />
        <Contact name='Elinaaaaa' status ='online' />
        <Contact name='Elinaaaaa' status ='online' />
        <Contact name='Elinaaaaa' status ='online' />
        <Contact name='Elinaaaaa' status ='online' />
        <Contact name='Elinaaaaa' status ='online' />
    </div>
);

export default ContactsField;
