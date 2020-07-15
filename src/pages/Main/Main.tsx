import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import ChatField from '../../components/ChatField/ChatField';
import ContactsField from '../../components/ContactsField/ContactsField';
import Loader from '../../components/Loader/Loader';
import { cn } from '../../modules/cn';
import { IAuthState } from '../../redux/auth/reducers';
import { IActionType, logOutThunk } from '../../redux/auth/actions';
import store from '../../redux/store';
import { deleteDialogs } from '../../redux/chat/actions';

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
    logOut?: () => void;
}

class Main extends React.Component<IMainProps, {}> {
    handleExit = (): void => {
        this.props.logOut();
        store.dispatch(deleteDialogs());
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

const mapStateToProps = (state: {auth: IAuthState}): IMainProps => {
    return {
        isLoading: state.auth.isLoading,
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAuthState, {}, Action<IActionType>>): {} => {
    return {
        logOut: (): void => logOutThunk(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
