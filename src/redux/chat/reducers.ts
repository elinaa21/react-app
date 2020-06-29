import { IActionType } from './actions';

export const actionTypes = {
    SET_CURRENT_TARGET_USER: 'SET_CURRENT_TARGET_USER',
};

export interface IChatState {
    currentTargetUser: string;
}

const initialState: IChatState = {
    currentTargetUser: ''
};

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