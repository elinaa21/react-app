import React from 'react';
import { Redirect } from 'react-router-dom';

import ChatField from '../ChatField/ChatField';
import ContactsField from '../ContactsField/ContactsField';
import Loader from '../Loader/Loader';
import { cn } from '../../modules/cn';
import authService from '../../services/authService';

import './Main.scss';


const classNames = {
    background: cn('background'),
    chat: cn('chat'),
    side: cn('side'),
    buttonExit: cn('exit'),
    sideName: cn('side', 'name'),
}

interface IMainState {
    progress: boolean;
    redirect: boolean;
}

class Main extends React.Component<{}, IMainState> {
    constructor(props: {}) {
        super(props);
        const authInfo = authService.getAuthData();
        if (authInfo instanceof Promise) {
            this.state = { progress: true, redirect: false };
            authInfo.then(result => {
                if (result.isAuth) {
                    this.setState({ progress: false });
                } else {
                    this.setState({ progress: false, redirect: true });
                }
            })
        } else {
            if (authInfo.isAuth) {
                this.state = { progress: false, redirect: false };
            } else {
                this.setState({ progress: false, redirect: true });
            }             
        }
    }

    render(): JSX.Element {
        return (
            this.state.progress ? <Loader /> :
            this.state.redirect ? <Redirect to='/login' /> :
            <>
                <div className={classNames.background}>
                    <div className={classNames.chat}>
                        <ContactsField />
                        <ChatField />
                        <div className={classNames.side}>
                            <button className={classNames.buttonExit}>EXIT</button>
                            <span className={classNames.sideName}>Elinaaa</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Main;