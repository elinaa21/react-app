import { Dispatch } from 'react';

import { actionTypes } from './reducers';
import authService from '../../services/authService';
import chatService from '../../services/chatService';
import store from '../store';
import { setContacts } from '../chat/actions';

interface IPayload {
    userName: string;
    isAuth: boolean;
}

export interface IActionType {
    type: string;
    payload?: IPayload;
}

export const setLoading = (): IActionType => ({ type: actionTypes.SET_LOADING });

export const setUserData = (userName: string, isAuth: boolean): IActionType => ({
    type: actionTypes.SET_USER_DATA,
    payload: { userName, isAuth }
});

export const setLoginError = (): IActionType => ({ type: actionTypes.SET_LOGIN_ERROR });

export const setRegisterError = (): IActionType => ({ type: actionTypes.SET_REGISTER_ERROR });

export const logOutThunk = (dispatch: Dispatch<IActionType>): void => {
    dispatch(setUserData('', false));
    authService.logOut();
};

export const loginThunk = (login: string, password: string, dispatch: Dispatch<IActionType>): void => {
    authService.login(login, password)
        .then((answer: { status: number }) => {
            if (answer.status === 200) {
                dispatch(setUserData(login, true));
                chatService.getContacts()
                    .then(res => res.json())
                    .then(res => {
                        store.dispatch(setContacts(res.contacts));
                    });
            } else {
                dispatch(setLoginError());
            }
        });
};

export const registerThunk = (login: string, password: string, dispatch: Dispatch<IActionType>): void => {
    authService.register(login, password)
    .then((answer: { status: number }) => {
        if (answer.status === 200) {
            dispatch(setUserData(login, true));
        } else {
            dispatch(setRegisterError());
        }
    });
};
