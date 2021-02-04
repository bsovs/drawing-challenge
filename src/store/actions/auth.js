import * as actionTypes from './actionTypes';
import firebase from "firebase";
import axios from "../../axios/axios-config";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authEnd = () => {
    return {
        type: actionTypes.AUTH_END
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

export const logout = (actions) => {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('uid');
                localStorage.removeItem('args');
                localStorage.removeItem('token');
                localStorage.removeItem('expirationDate');
            })
            .catch(error => console.log(error))
            .finally(() => {
                dispatch({
                    type: actionTypes.AUTH_LOGOUT
                });
            });
    }
};

export const auth = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                user.getIdToken()
                    .then(async(accessToken) => {
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

                        axios.get('/profile/me', {headers: {Authorization: `Bearer ${accessToken}`}})
                            .then(response => {
                                const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
                                localStorage.setItem('token', accessToken);

                                localStorage.setItem('uid', user.uid);
                                localStorage.setItem('args', JSON.stringify(args));
                                localStorage.setItem('expirationDate', expirationDate);

                                localStorage.setItem('coins', response.data.coins);
                                localStorage.setItem('gems', response.data.gems);

                                dispatch(authSuccess({...args, coins: response.data.coins, gems: response.data.gems}));
                                dispatch(authCheckState());
                            })
                            .catch(error => {
                                dispatch(authFail(error));
                            });
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
            dispatch(authCheckState());
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
                const coins = localStorage.getItem('coins');
                const gems = localStorage.getItem('gems');

                dispatch(authSuccess({...args, coins: coins, gems: gems}));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};