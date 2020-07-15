import { IActionType, IPayload } from './actions';
import { dn } from '../../modules/dn';

export const actionTypes = {
    SET_CURRENT_TARGET_USER: 'SET_CURRENT_TARGET_USER',
    SET_UNREAD_MESSAGE: 'SET_UNREAD_MESSAGE',
    DELETE_UNREAD_MESSAGE: 'DELETE_UNREAD_MESSAGE',
    SET_DIALOG: 'SET_DIALOG',
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CONTACTS: 'SET_CONTACTS',
    DELETE_DIALOGS: 'DELETE_DIALOGS',
};

export interface IChatState {
    currentTargetUser: string;
    unreadMessages: Array<string>;
    dialogs: Record<string,Array<IPayload>>;
    contacts: Array<Record<string, string>>;
}

const initialState: IChatState = {
    currentTargetUser: '',
    unreadMessages: [],
    dialogs: {},
    contacts: []
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

        case actionTypes.SET_DIALOG:
            state.dialogs[action.payload.dialogName] = action.payload.messages;
            return {
                ...state,
                dialogs: { 
                    ...state.dialogs
                }
            }

        case actionTypes.SET_MESSAGE:
            const dialogName = dn(action.payload.from, action.payload.to);
            if (state.dialogs[dialogName]) {
                state.dialogs[dialogName] = [ ...state.dialogs[dialogName], action.payload ];
            } else {
                state.dialogs[dialogName] = [ action.payload ];
            }   
            return {
                ...state,
                dialogs: {
                    ...state.dialogs
                }
            }

        case actionTypes.SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload.contacts
            }

        case actionTypes.DELETE_DIALOGS:
            return {
                ...state,
                dialogs: {}
            }

        default:
            return { ...state };
    }
}
