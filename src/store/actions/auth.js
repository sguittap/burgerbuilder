import * as actionTypes from './actionTypes';
import axios from 'axios';
require('dotenv').config();



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};


export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }  
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
        axios.post(API_KEY, authData)
            .then(response => {
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
};