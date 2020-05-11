import React from 'react';

import Search from '../Search/Search.jsx';
import Contact from '../Contact/Contact.jsx';

import './ContactsField.scss';

const ContactsField = () => (
    <div className = 'container-contacts'>
        <Search />
        <div style={{ height: '10%' }}></div>
        <Contact name='Ellie' isOnline='true' status ='online' />
        <Contact name='Igorrrr' isOnline='true' status ='online' />
        <Contact name='Elinaaaaa' isOnline='true' status ='online' />
        <Contact name='Elinaaaaa' isOnline='true' status ='online' />
        <Contact name='Elinaaaaa' isOnline='true' status ='online' />
        <Contact name='Elinaaaaa' isOnline='true' status ='online' />
        <Contact name='Elinaaaaa' isOnline='true' status ='online' />
    </div>
);

export default ContactsField;
