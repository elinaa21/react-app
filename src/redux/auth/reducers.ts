import { IActionType } from './actions';

export const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    LOG_OUT: 'LOG_OUT',
    SET_USER_DATA: 'SET_USER_DATA',
    SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
};

export interface IChatState {
    isLoading: boolean;
    isAuth: boolean;
    userName: string;
    loginError: boolean;
}

const initialState: IChatState = {
    isLoading: false,
    isAuth: false,
    userName: '',
    loginError: false,
};

export const authReducer = (state = initialState, action: IActionType): IChatState => {
    switch (action.type) {
        case actionTypes.SET_LOADING: 
            return {
                ...state,
                isLoading: true 
            };

        case actionTypes.SET_USER_DATA:
            return { 
                ...state,
                userName: action.payload.userName,
                isAuth: action.payload.isAuth,
                loginError: false,
                isLoading: false
            };

        case actionTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: true
            }
        
        default:
            return { ...state };
    }
}
