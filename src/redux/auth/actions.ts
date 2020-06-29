import { actionTypes } from './reducers';
import authService from '../../services/authService';
import { Dispatch } from 'react';

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
        .then((answer: Response) => {
            if (answer.status === 200) {
                dispatch(setUserData(login, true));
            } else {
                dispatch(setLoginError());
            }
        });
};

export const registerThunk = (login: string, password: string, dispatch: Dispatch<IActionType>): void => {
    authService.register(login, password)
    .then((answer: Response) => {
        if (answer.status === 200) {
            dispatch(setUserData(login, true));
        } else {
            dispatch(setRegisterError());
        }
    });
};
