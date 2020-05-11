import React from 'react';
import './Search.scss';


const Search = () => (
    <div className='search'>
        <input type='text' className='search__input' placeholder='поиск' />
        <div className='search__img' />
    </div>
);

export default Search;
