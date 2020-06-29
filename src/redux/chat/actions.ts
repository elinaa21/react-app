import { actionTypes } from './reducers';

interface IPayload {
    currentTargetUser?: string;
}

export interface IActionType {
    type: string;
    payload?: IPayload;
}

export const setCurrentTargetUser = (currentTargetUser: string): IActionType => ({
    type: actionTypes.SET_CURRENT_TARGET_USER,
    payload: { currentTargetUser }
});