import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authService, { IAuthData } from '../services/authService';
import chatService from '../services/chatService';
import { setUserData, setLoading } from './auth/actions';
import { authReducer } from './auth/reducers';
import { chatReducer } from './chat/reducers';
import thunk from 'redux-thunk';
import { setContacts } from './chat/actions';

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    chat: chatReducer,
    thunk: applyMiddleware(thunk)
});

const store = createStore(reducers);

const handleAuth = (answer: IAuthData): void => {
    if (answer.isAuth) {
        chatService.matchUserName(answer.userName);
        store.dispatch(setUserData(answer.userName, true));
        chatService.getContacts()
            .then(res => res.json())
            .then(res => {
                store.dispatch(setContacts(res.contacts));
            });
    } else {
        store.dispatch(setUserData('', false));
    }
}

const answer = authService.getAuthData();
if (answer instanceof Promise) {
    store.dispatch(setLoading());
    answer.then(result => {
        handleAuth(result);
    });
} else {
    handleAuth(answer);
}

export default store;
