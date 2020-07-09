import { actionTypes } from './reducers';
import store from '../store';

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
    const date = new Date().toString();
    const _id = date + Math.floor(Math.random() * 100);
    return {
        type: actionTypes.SET_MESSAGE,
        payload: { _id, from, to, message, date }
    }
};
