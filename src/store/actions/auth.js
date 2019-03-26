import * as actionTypes from './actionTypes';
import axios from 'axios';

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
        const API_KEY = process.env.FIREBASE_API_KEY;
        axios.post(`'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}'`)
    }
};