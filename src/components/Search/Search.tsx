import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

import { cn } from '../../modules/cn';
import { IActionType, setContacts } from '../../redux/chat/actions';
import { IChatState } from '../../redux/chat/reducers';

import './Search.scss';


const classNames = {
    search: cn('search'),
    searchInput: cn('search', 'input'),
    searchImg: cn('search', 'img'),
};

interface ISearchProps {
    allContacts: Array<Record<string, string>>;
    setContacts?: (contacts: Array<Record<string, string>>) => IActionType;
}

class Search extends React.Component<ISearchProps> {
    componentDidMount(): void {
        const search$: Observable<Event> = fromEvent<Event>(
            document.getElementById('search'),
            'input'
        );
        
        search$.pipe(
            map(event => {
                if (event.target) return (event.target as HTMLInputElement).value;
            }),
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe({
            next: value => {
                const allContacts = this.props.allContacts;
                const filteredContacts = allContacts.filter(contact => 
                    contact.login.toLowerCase().includes(value.toLowerCase()));
                this.props.setContacts(filteredContacts);
            }
        });
    }

    render(): JSX.Element {
        return (
            <div className={classNames.search}>
                <input type='text' className={classNames.searchInput} placeholder='search' id='search' />
                <div className={classNames.searchImg} />
            </div>
        )
    }
}

const mapStateToProps = (state: {chat: IChatState}): ISearchProps => ({
    allContacts: state.chat.allContacts,
});

const mapDispatchToProps = (dispatch: Dispatch<IActionType>): {} => ({ 
    setContacts: (contacts: Array<Record<string, string>>): IActionType => dispatch(setContacts(contacts))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
