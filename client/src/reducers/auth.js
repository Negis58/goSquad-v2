import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED, FORGOT_PASSWORD, REFRESH_PASSWORD
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case ACCOUNT_DELETED:
            return {
                ...state,
                accessToken: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        case REFRESH_PASSWORD:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            };
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                accessToken: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}
