import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authService from '../services/authService';
import { setUserData, setLoading } from './auth/actions';
import { authReducer } from './auth/reducers';

// interface IAppState {
//     loading: boolean;
// }

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer
});

const store = createStore(reducers);

const answer = authService.getAuthData();
if (answer instanceof Promise) {
    store.dispatch(setLoading());
    answer.then(result => {
        console.log(result);
        if (result.isAuth) {
            store.dispatch(setUserData(result.userName, true));
        } else {
            store.dispatch(setUserData('', false));
        }
    });
} else {
    if (answer.isAuth) {
        store.dispatch(setUserData(answer.userName, true));
    } else {
        store.dispatch(setUserData('', false));
    }    
}



export default store;
