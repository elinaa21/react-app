import { actionTypes } from './reducers';
import thunk from 'redux-thunk';

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

