import { actionTypes } from './reducers';
import store from '../store';

interface IPayload {
    currentTargetUser?: string;
    from?: string;
    arrFrom?: Array<string>;
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
})

export const deleteUnreadMessage = (from: string): IActionType => {
    const arrFrom = store.getState().chat.unreadMessages;
    const index = arrFrom.indexOf(from);
    arrFrom.splice(index, 1);
    return {
        type: actionTypes.DELETE_UNREAD_MESSAGE,
        payload: { arrFrom }
    }
}