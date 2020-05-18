import React from 'react';

import { cn } from '../../modules/cn';

import './Loader.scss';

const Loader: React.FC = () => (
    <div className = {cn('loader')}>
        <span>Loading...</span>
        <div className = {cn('loader', 'spinner')}></div>
    </div>
);

export default Loader;
