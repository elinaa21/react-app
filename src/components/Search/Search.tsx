import React from 'react';

import { cn } from '../../modules/cn';

import './Search.scss';

const classNames = {
    search: cn('search'),
    searchInput: cn('search', 'input'),
    searchImg: cn('search', 'img'),
};

const Search: React.FC = () => (
    <div className={classNames.search}>
        <input type='text' className={classNames.searchInput} placeholder='search' />
        <div className={classNames.searchImg} />
    </div>
);

export default Search;
