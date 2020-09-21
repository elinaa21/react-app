import { actionTypes } from './reducers';
import store from '../store';
import authService from '../../services/authService';

export interface IPayload {
    currentTargetUser?: string;
    from?: string;
    arrFrom?: Array<string>;
    messages?: Array<Record<string, string>>;
    dialogName?: string;
    _id?: string;
    to?: string;
    message?: string;
    date?: string;
    contacts?: Array<Record<string, string>>;
    online?: Array<string>;
    allContacts?: Array<Record<string, string>>;
}

export interface IActionType {
    type: string;
    payload?: IPayload;
}

export const setCurrentTargetUser = (currentTargetUser: string): IActionType => ({
    type: actionTypes.SET_CURRENT_TARGET_USER,
    payload: { currentTargetUser }
});

export const setUnreadMessage = (from: string): IActionType => ({
    type: actionTypes.SET_UNREAD_MESSAGE,
    payload: { from }
});

export const deleteUnreadMessage = (from: string): IActionType => {
    const arrFrom = store.getState().chat.unreadMessages;
    const index = arrFrom.indexOf(from);
    arrFrom.splice(index, 1);
    return {
        type: actionTypes.DELETE_UNREAD_MESSAGE,
        payload: { arrFrom }
    }
};

export const setDialog = (dialogName: string, messages: Array<Record<string, string>>): IActionType => ({
    type: actionTypes.SET_DIALOG,
    payload: { dialogName, messages }
});

export const setMessage = (from: string, to: string, message: string): IActionType => {
    const date = JSON.stringify(new Date()).slice(1);
    const _id = date + Math.floor(Math.random() * 100);
    return {
        type: actionTypes.SET_MESSAGE,
        payload: { _id, from, to, message, date }
    }
};

export const setContacts = (contactsWithUser: Array<Record<string, string>>): IActionType => {
    const contacts = contactsWithUser.filter((contact) => contact.login !== authService.userName);
    return {
        type: actionTypes.SET_CONTACTS,
        payload: { contacts }
    }
};

export const setAllContacts = (contactsWithUser: Array<Record<string, string>>): IActionType => {
    const allContacts = contactsWithUser.filter((contact) => contact.login !== authService.userName);
    return {
        type: actionTypes.SET_ALL_CONTACTS,
        payload: { allContacts }
    }
};

export const deleteDialogs = (): IActionType => ({ type: actionTypes.DELETE_DIALOGS });

export const setOnlineStatus = (users: Array<string>): IActionType => {
    const online = users.filter((user) => user !== authService.userName);
    return {
        type: actionTypes.SET_ONLINE_STATUS,
        payload: { online }
    }
}
