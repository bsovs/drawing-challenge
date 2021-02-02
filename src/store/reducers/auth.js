import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    displayName: null,
    email: null,
    emailVerified: null,
    phoneNumber: null,
    photoURL: null,
    uid: null,
    providerData: null,
    accessToken: null,
    error: null,
    loading: true,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authEnd = (state, action) => {
    return updateObject(state, {error: null, loading: false});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        displayName: action.displayName,
        email: action.email,
        emailVerified: action.emailVerified,
        phoneNumber: action.phoneNumber,
        photoURL: action.photoURL,
        uid: action.uid,
        providerData: action.providerData,
        accessToken: action.accessToken,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        displayName: null,
        email: null,
        emailVerified: null,
        phoneNumber: null,
        photoURL: null,
        uid: null,
        providerData: null,
        accessToken: null,
        error: null,
        loading: false
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_END:
            return authEnd(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;