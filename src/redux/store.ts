import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authService from '../services/authService';
import chatService from '../services/chatService';
import { setUserData, setLoading } from './auth/actions';
import { authReducer } from './auth/reducers';
import { chatReducer } from './chat/reducers';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    chat: chatReducer,
    thunk: applyMiddleware(thunk)
});

const store = createStore(reducers);

const answer = authService.getAuthData();
if (answer instanceof Promise) {
    store.dispatch(setLoading());
    answer.then(result => {
        if (result.isAuth) {
            chatService.matchUserName(result.userName);
            store.dispatch(setUserData(result.userName, true));
        } else {
            store.dispatch(setUserData('', false));
        }
    });
} else {
    if (answer.isAuth) {
        chatService.matchUserName(answer.userName);
        store.dispatch(setUserData(answer.userName, true));
    } else {
        store.dispatch(setUserData('', false));
    }
}

export default store;
