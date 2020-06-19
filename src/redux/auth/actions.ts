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

// const logOut = () => ({

// });

export const getAuthDataThunk = (dispatch: Dispatch<IActionType>): void => {
    dispatch(setLoading());
    const authInfo = authService.getAuthData();
        if (authInfo instanceof Promise) {
            authInfo.then(result => {
                dispatch(setUserData(result.userName, result.isAuth));
            })
        } else {
            dispatch(setUserData(authInfo.userName, authInfo.isAuth))          
        }
}

export const loginThunk = (login: string, password: string, dispatch: Dispatch<IActionType>): void => {
    authService.login(login, password)
        .then((answer: Response) => {
            if (answer.status === 200) {
                dispatch(setUserData(login, true));
            } else {
                // диспачить экшн который выставляет сообщение об ошибке
            }
        });
}
