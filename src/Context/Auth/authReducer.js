import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_USER,
    FORGOT_PASSWORD_RESPONSE,
    RESET_PASSWORD_RESPONSE,
    CLEAR_RES
} from '../Types';

const authReducer = (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loaded: true,
                // Set the user equal to the user sent from the payload
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // Setting the token sent within the payload as local storage 
            localStorage.setItem('token', action.payload.token)
            return {
                // Spreading the current state
                ...state,
                // Storing token in state
                ...action.payload,
                // Setting isAuthenticated state to true
                isAuthenticated: true,
                loaded: true
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_USER:
            // Removing token from local storage
            localStorage.removeItem('token')
            return {
                // Current state
                ...state,
                // Reset token
                token: null,
                // Set authenticated to false
                isAuthenticated: false,
                loaded: false,
                // No user
                user: null,
                // Getting the error message sent if the registration fails
                error: action.payload
            };
        case CLEAR_RES:
           return {
               ...state,
                // Clear the error
               error: null,
               forgotPwdRes: null,
               loaded: false
           };
        case FORGOT_PASSWORD_RESPONSE: 
           return {
               ...state,
                // Forgot password response
               forgotPwdRes: action.payload
           };
        case RESET_PASSWORD_RESPONSE:
           return {
               ...state,
                // Reset password response   
               resetPwdRes: action.payload
           }
        default: 
            return state;
    }
}

export default authReducer;