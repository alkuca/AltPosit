import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SUBMIT_LOADING,
    THEME_CHANGED,
    DELETE_TRANSACTION,
    DELETE_NOTE,
    REFRESH_TOGGLED,
    RESET_PASSWORD,
    REQUESTED_EMAIL_PASSWORD_RESET,
    GET_ERRORS,
    RESET_DATA,
    CANDLE_CHANGED
} from "../actions/types";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    submitLoading:false,
    registerSuccessful:false,
    user:null,
    theme:"",
    transaction:[],
    transactionDeleteLoading:true,
    note:[],
    noteDeleteLoading:true,
    autoRefresh:false,
    candleDuration:"",
    passwordReset:false,
    isConfirmed:false,
    requestedPasswordReset:false,
    errors:[]
};


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isConfirmed:action.payload.emaillConfirmed,
                requestedPasswordReset:action.payload.requestedPasswordReset,
                loading:false,
                user:action.payload,
                theme:action.payload.theme,
                autoRefresh:action.payload.autoRefresh,
                transaction:[],
                transactionDeleteLoading:true,
                passwordReset:false,
                errors:[],
                registerSuccessful: false,
                candleDuration:action.payload.candleDuration
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading:false,
                registerSuccessful:true,
                errors:[]
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false,
                errors:[]
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false,
                errors:action.payload
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false,
                errors: action.payload
            };
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false,
                passwordReset:false
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                user:null
            };
        case SUBMIT_LOADING:
            localStorage.removeItem("token");
            return{
                ...state,
                submitLoading: true,
            };
        case THEME_CHANGED:
            return{
                ...state,
                theme: action.payload
            };
        case CANDLE_CHANGED:
            return{
                ...state,
                candleDuration: action.payload
            };
        case REFRESH_TOGGLED:
            return{
                ...state,
                autoRefresh: action.payload
            };
        case DELETE_TRANSACTION:
            return{
                ...state,
                transaction: action.payload,
                transactionDeleteLoading:false
            };
        case DELETE_NOTE:
            return{
                ...state,
                note: action.payload,
                noteDeleteLoading:false
            };
        case RESET_PASSWORD:
            return{
                ...state,
                passwordReset:true
            };
        case REQUESTED_EMAIL_PASSWORD_RESET:
            return{
                ...state,
                errors: [],
                submitLoading:false,
                successMessage:action.payload
            };
        case GET_ERRORS:
            return{
                ...state,
                errors: action.payload,
                submitLoading:false
            };
        case RESET_DATA:
            return{
                ...state,
                errors:[],
                registerSuccessful: false
            };
        default:
            return state
    }
}