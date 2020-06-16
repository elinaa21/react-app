import { actionTypes } from './reducers';

export const setLoading = () => ({ type: actionTypes.SET_LOADING });

export const setUserData = (userName: string, isAuth: boolean) => ({
    type: actionTypes.SET_USER_DATA,
    payload: { userName, isAuth }
});

// const logOut = () => ({

// });

