import { IActionType } from './actions';

export const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    LOG_OUT: 'LOG_OUT',
    SET_USER_DATA: 'SET_USER_DATA',
    SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
    SET_REGISTER_ERROR: 'SET_REGISTER_ERROR',
    SET_CURRENT_TARGET_USER: 'SET_CURRENT_TARGET_USER',
};

export interface IChatState {
    isLoading: boolean;
    isAuth: boolean;
    userName: string;
    loginError: boolean;
    registerError: boolean;
    currentTargetUser: string;
}

const initialState: IChatState = {
    isLoading: false,
    isAuth: false,
    userName: '',
    loginError: false,
    registerError: false,
    currentTargetUser: ''
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
                registerError: false,
                isLoading: false
            };

        case actionTypes.SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: true
            };

        case actionTypes.SET_REGISTER_ERROR:
            return {
                ...state,
                registerError: true
            };
        
        default:
            return { ...state };
    }
}

export const chatReducer = (state = initialState, action: IActionType): IChatState => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_TARGET_USER:
            return {
                ...state,
                currentTargetUser: action.payload.currentTargetUser
            };

        default:
            return { ...state };
    }
}
