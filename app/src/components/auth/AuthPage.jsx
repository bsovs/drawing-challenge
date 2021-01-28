import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import Button from "@material-ui/core/Button";

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyDgpy4Qy_JI90ZhAupzDYfldNcRp8cb8fo',
    authDomain: 'drawingchallenge5.firebaseapp.com',
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/app',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
            requireDisplayName: true,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};

const SignInScreen = props => {
    if (props.isAuthenticated) {
        return (
            <div>
                {props.displayName}
                <Button onClick={props.logout}
                        variant="contained"
                        color="primary">
                    Logout
                </Button>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        displayName: state.auth.displayName,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(actions.auth()),
        logout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);