import { IActionType } from './actions';

export const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    LOG_OUT: 'LOG_OUT',
    SET_USER_DATA: 'SET_USER_DATA',
};

export interface IChatState {
    isLoading: boolean;
    isAuth: boolean;
    userName: string;
}

const initialState: IChatState = {
    isLoading: false,
    isAuth: false,
    userName: '',
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
                isLoading: false
            };
        
        default:
            return { ...state };
    }
}
