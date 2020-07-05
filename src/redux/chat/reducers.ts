import { IActionType } from './actions';

export const actionTypes = {
    SET_CURRENT_TARGET_USER: 'SET_CURRENT_TARGET_USER',
    SET_UNREAD_MESSAGE: 'SET_UNREAD_MESSAGE',
    DELETE_UNREAD_MESSAGE: 'DELETE_UNREAD_MESSAGE',
    SET_MESSAGES: 'SET_MESSAGES'
};

export interface IChatState {
    currentTargetUser: string;
    unreadMessages: Array<string>;
    messages: Array<Record<string, string>>;
    count: number;
}

const initialState: IChatState = {
    currentTargetUser: '',
    unreadMessages: [],
    messages: [],
    count: 0,
};

export const chatReducer = (state = initialState, action: IActionType): IChatState => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_TARGET_USER:
            return {
                ...state,
                currentTargetUser: action.payload.currentTargetUser
            };

        case actionTypes.SET_UNREAD_MESSAGE:
            return {
                ...state,
                unreadMessages: [...state.unreadMessages, action.payload.from]
            }

        case actionTypes.DELETE_UNREAD_MESSAGE:
            return {
                ...state,
                unreadMessages: action.payload.arrFrom
            }

        case actionTypes.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload.messages,
                count: action.payload.count
            }

        default:
            return { ...state };
    }
}