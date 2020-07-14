import React from 'react';
import { connect } from 'react-redux';

import Search from '../Search/Search';
import Contact from '../Contact/Contact';
import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/chat/reducers';

import './ContactsField.scss';

const classNames = {
    containerContacts: cn('container-contacts'),
}

interface IContactsFieldProps {
    contacts: Array<Record<string, string>>;
}


const ContactsField: React.FC<IContactsFieldProps> = (props: IContactsFieldProps) => {
    const allContacts = props.contacts.map(contact => 
        <Contact name={contact.login} key={contact._id} status='online' />
    );

    return (
        <div className={classNames.containerContacts}>
            <Search />
            <div style={{ height: '10%' }}></div>
            { allContacts }
        </div>
    );
}

const mapStateToProps = (state: {chat: IChatState}): IContactsFieldProps => ({
    contacts: state.chat.contacts,
});

export default connect(mapStateToProps)(ContactsField);
