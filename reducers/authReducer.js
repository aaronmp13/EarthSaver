import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
    } from "../actions/types"
    
    const initialState = {
        isAuthenticated: false,
        isLoading: false,
    };
    
    export default (state = initialState, action) => {
        switch(action.type){
            case LOGIN_SUCCESS:
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false 
                };
            case LOGIN_FAIL:
                localStorage.setItem('token', "");
                return{
                    isAuthenticated: false,
                }
            case LOGOUT_SUCCESS:
                localStorage.setItem('token', "");
                return{
                    isAuthenticated: false,
                }
            default:
                return{
                    ...state
                }
        }
    }