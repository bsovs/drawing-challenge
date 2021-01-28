import * as actionTypes from './actionTypes';
import firebase from "firebase";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (args) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        ...args
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('uid');
            localStorage.removeItem('args');
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
        })
        .catch(error => console.log(error));
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = () => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                user.getIdToken()
                    .then((accessToken) => {
                        const args = {
                            displayName: user.displayName,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            phoneNumber: user.phoneNumber,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            providerData: user.providerData,
                            accessToken: accessToken,
                        };
                        const expirationDate = new Date(new Date().getTime() + 60 * 1000);
                        localStorage.setItem('uid', user.uid);
                        localStorage.setItem('args', JSON.stringify(args));
                        localStorage.setItem('token', accessToken);
                        localStorage.setItem('expirationDate', expirationDate);

                        dispatch(authSuccess(args));
                    })
                    .catch(error => {
                        dispatch(authFail(error));
                    });
            } else {
                // User is signed out.
                dispatch(logout());
            }
        }, (error) => {
            dispatch(authFail(error));
        });
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(auth());
            } else {
                const args = JSON.parse(localStorage.getItem('args'));
                dispatch(authSuccess(args));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};