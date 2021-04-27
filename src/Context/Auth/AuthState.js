import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../Utils/setAuthToken';
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

const AuthState = props => {
    // Initial authentication state
    const initialState = {
        // JWT
        token: localStorage.getItem('token'),
        // If the user is authenticated
        isAuthenticated: null,
        // If the page is done loading
        loaded: true,
        // The current logged in user
        user: null,
        // Authentication errors and success messages
        error: null,
        forgotPwdRes: null,
        resetPwdRes: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        // if a token exists in local storage
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + 'auth');
            dispatch({ 
                // Dispatch the user to the reducer
                type: USER_LOADED, 
                payload: res.data 
            });
        } catch (err) {
            // If there is an error
            dispatch({ type: AUTH_ERROR });
        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + 'users', formData, config);
            dispatch({ 
                type: REGISTER_SUCCESS,
                // Payload will be equal to token
                payload: res.data
             });
             loadUser();
        } catch (err) {
            dispatch({ 
                type: REGISTER_FAIL,
                // Setting payload to error message
                payload: err.response.data.msg
             });
        }
    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + 'auth', formData, config);
            dispatch({ 
                type: LOGIN_SUCCESS,
                // Payload will be equal to token
                payload: res.data
             });
             loadUser();
        } catch (err) {
            dispatch({ 
                type: LOGIN_FAIL,
                // Setting payload to error message
                payload: err.response.data.msg
             });
        }
    }

    // Logout 
    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    // Forgot Password
    const forgotPassword = async email => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
           const res = await axios.put(process.env.REACT_APP_API_URL + 'auth/forgot', email, config);
            dispatch({ 
                type: FORGOT_PASSWORD_RESPONSE,
                // Setting payload to error message
                payload: res.data.msg
             })
        } catch (err) {
            dispatch({ 
                type: FORGOT_PASSWORD_RESPONSE,
                // Setting payload to error message
                payload: err.response.data.msg
             })
        }
    }

    // Forgot Password
    const resetPassword = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(process.env.REACT_APP_API_URL + 'auth/reset/password', formData, config);
            dispatch({ 
                type: RESET_PASSWORD_RESPONSE,
                // Setting payload to error message
                payload: res.data.msg
             });
        } catch (err) {
            dispatch({ 
                type: RESET_PASSWORD_RESPONSE,
                // Setting payload to error message
                payload: err.response.data.msg
             });
        }
    }
    
    // Delete User
    const deleteUser = async id => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + `users/${id}`);
            // Dispatching the function and the payload to the reducer
            dispatch({ 
                type: DELETE_USER, 
                payload: id
            });
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    // Clear repsonse errors
    const clearRes = () => {
        dispatch({ type: CLEAR_RES });
    }

    // Passing state and functions to context
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loaded: state.loaded,
            user: state.user,
            error: state.error,
            forgotPwdRes: state.forgotPwdRes,
            resetPwdRes: state.resetPwdRes,
            register,
            loadUser,
            login,
            logout,
            forgotPassword,
            resetPassword,
            deleteUser,
            clearRes
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;