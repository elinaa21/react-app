import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authService from '../services/authService';
import { setUserData, setLoading } from './auth/actions';
import { authReducer, chatReducer } from './auth/reducers';
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
            //тут тоже мэтч
            store.dispatch(setUserData(result.userName, true));
        } else {
            store.dispatch(setUserData('', false));
        }
    });
} else {
    if (answer.isAuth) {
        //вот здесь мэтч
        store.dispatch(setUserData(answer.userName, true));
    } else {
        store.dispatch(setUserData('', false));
    }
}

export default store;
