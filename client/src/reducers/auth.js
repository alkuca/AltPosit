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
    DELETE_NOTE
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
    noteDeleteLoading:true

};


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload,
                theme:action.payload.theme,
                transaction:[],
                transactionDeleteLoading:true
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading:false,
                registerSuccessful:true
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false
            };
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                submitLoading: false
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
                submitLoading: true
            };
        case THEME_CHANGED:
            return{
                ...state,
                theme: action.payload
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
        default:
            return state
    }
}