import React from 'react';
import { cn } from '../../modules/cn';

import './Input.scss';

const classNames = {
    errorMessage: cn('error-message'),
    errorContainer: cn('error-container'),
    inputData: cn('input-data'),
    inputDataError: cn('input-data', '', {error: true}),
}

interface IPropsInput {
    input: Record<string,string>;
    meta: Record<string,string|boolean>;
}

const Input: React.FC<IPropsInput> = ({input, meta, ...props}: IPropsInput) => {
    let hasError = false;
    if (meta.touched && meta.error) hasError = true;
    return (
        <>
            <input {...input} {...props} className={cn('input-data', '', {error: hasError})} />
            { 
                hasError &&
                    <div className={classNames.errorContainer}>
                            <span className={classNames.errorMessage}>{meta.error}</span>
                    </div>
            }
        </>
    )
}

export default Input;
