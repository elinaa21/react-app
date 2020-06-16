export const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    LOG_OUT: 'LOG_OUT',
    SET_USER_DATA: 'SET_USER_DATA',
};

const initialState = {
    isLoading: false,
    isAuth: false,
    userName: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING: 
            return { 
                ...state,
                isLoading: true 
            };

        case actionTypes.SET_USER_DATA:
            return { 
                ...state, 
                userName: action.payload.userName, 
                isAuth: action.payload.isAuth,
                isLoading: false            
            };
        
        default:
            return { ...state };
    }
}
