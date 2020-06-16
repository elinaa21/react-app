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
    redirectToLogin: boolean;
}

class Main extends React.Component<{}, IMainState> {
    constructor(props: {}) {
        super(props);
        this.state = { progress: true, redirectToLogin: false };
        console.log(props);
        // const authInfo = authService.getAuthData();
        // if (authInfo instanceof Promise) {
        //     this.state = { progress: true, redirectToLogin: false };
        //     authInfo.then(result => {
        //         if (result.isAuth) {
        //             this.setState({ progress: false });
        //         } else {
        //             this.setState({ progress: false, redirectToLogin: true });
        //         }
        //     })
        // } else {
        //     if (authInfo.isAuth) {
        //         this.state = { progress: false, redirectToLogin: false };
        //     } else {
        //         this.state = { progress: false, redirectToLogin: true };
        //     }             
        // }
    }

    componentDidUpdate(): void {
        console.log(this.props);
    }

    handleExit = (): void => {
        this.setState({ redirectToLogin: true });
        authService.logOut();
    }

    render(): JSX.Element {
        return (
            this.state.progress ? <Loader /> :
            this.state.redirectToLogin ? <Redirect to='/login' /> :
            <>
                <div className={classNames.background}>
                    <div className={classNames.chat}>
                        <ContactsField />
                        <ChatField />
                        <div className={classNames.side}>
                            <button className={classNames.buttonExit} onClick={this.handleExit} >EXIT</button>
                            <span className={classNames.sideName}>{authService.userName}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Main;