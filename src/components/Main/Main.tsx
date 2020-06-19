import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import ChatField from '../ChatField/ChatField';
import ContactsField from '../ContactsField/ContactsField';
import Loader from '../Loader/Loader';
import { cn } from '../../modules/cn';
import { IChatState } from '../../redux/auth/reducers';
import { getAuthDataThunk, IActionType } from '../../redux/auth/actions';

import './Main.scss';


const classNames = {
    background: cn('background'),
    chat: cn('chat'),
    side: cn('side'),
    buttonExit: cn('exit'),
    sideName: cn('side', 'name'),
}

interface IMainProps {
    isLoading: boolean;
    isAuth: boolean;
    userName: string;
}

class Main extends React.Component<IMainProps, {}> {
    // constructor(props: {}) {
    //     super(props);
        // this.state = { progress: true, redirectToLogin: false };
        // console.log(props);
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
    //}

    handleExit = (): void => {
        //this.props({ redirectToLogin: true });
        //authService.logOut();
    }

    render(): JSX.Element {
        return (
            this.props.isLoading ? <Loader /> :
            !this.props.isAuth ? <Redirect to='/login' /> :
            <>
                <div className={classNames.background}>
                    <div className={classNames.chat}>
                        <ContactsField />
                        <ChatField />
                        <div className={classNames.side}>
                            <button className={classNames.buttonExit} onClick={this.handleExit} >EXIT</button>
                            <span className={classNames.sideName}>{this.props.userName}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: {auth: IChatState}): IMainProps => {
    return {
        isLoading: state.auth.isLoading,
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IChatState, {}, Action<IActionType>>): {} => {
    return {
        //getAuthData: getAuthDataThunk(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);