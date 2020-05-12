import React from 'react';

import './Loader.scss';

const Loader = () => (
    <div className='loader-bg'>
        <span>Loading...</span>
        <div className='loader-spinner'></div>
    </div>
);

export default Loader;
