import React from 'react';

import { cn } from '../../modules/cn';

import './Search.scss';


const Search: React.FC = () => (
    <div className = {cn('search')}>
        <input type='text' className = {cn('search', 'input')} placeholder='search' />
        <div className = {cn('search', 'img')} />
    </div>
);

export default Search;
