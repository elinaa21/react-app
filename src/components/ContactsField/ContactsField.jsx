import React from 'react';
import Search from '../Search/Search.jsx';
import Contact from '../Contact/Contact.jsx';
import './ContactsField.scss';

const ContactsField = () => (
    <div className = 'container-contacts'>
        <Search />
        <div style={{ height: '10%' }}></div>
        <Contact name='Элино4ка Абдуллина' isOnline='true' status ='онлайн' />
        <Contact name='Игорек Уголек' isOnline='true' status ='онлайн' />
        <Contact name='Элинааааааа' isOnline='true' status ='онлайн' />
        <Contact name='Элина малина' isOnline='true' status ='онлайн' />
        <Contact name='Элино4ка Абдуллина' isOnline='true' status ='онлайн' />
        <Contact name='Игорек Уголек' isOnline='true' status ='онлайн' />
        <Contact name='Элинааааааа' isOnline='true' status ='онлайн' />
        <Contact name='Элина малина' isOnline='true' status ='онлайн' />
        <Contact name='Элино4ка Абдуллина' isOnline='true' status ='онлайн' />
        <Contact name='Игорек Уголек' isOnline='true' status ='онлайн' />
        <Contact name='Элинааааааа' isOnline='true' status ='онлайн' />
        <Contact name='Элина малина' isOnline='true' status ='онлайн' />
    </div>
);

export default ContactsField;
