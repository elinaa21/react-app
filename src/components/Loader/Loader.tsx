import React from 'react';

import { cn } from '../../modules/cn';

import './Loader.scss';

const classNames = {
    loader:cn('loader'),
    loaderSpinner: cn('loader', 'spinner'),
}

const Loader: React.FC = () => (
    <div className={classNames.loader}>
        <span>Loading...</span>
        <div className={classNames.loaderSpinner}></div>
    </div>
);

export default Loader;
