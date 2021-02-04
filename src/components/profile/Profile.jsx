import React, {useState} from 'react';

import '../App.css';
import NavBar from "../nav/NavBar";
import {useHistory, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Clipboard from "../buttons/Clipboard";

const useStyles = makeStyles((theme) => ({}));

function Profile(props) {
    const history = useHistory();
    const classes = useStyles();
    const {game_id} = useParams();

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            height: '100%'
        }}>
            <h2>{props.displayName}'s profile</h2>
            <table className={'profileTable'}>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{props.displayName}</td>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>
                        <Clipboard
                            copy={props.uid}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Phone #</td>
                    <td>{props.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{props.email}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        loading: state.auth.loading,
        displayName: state.auth.displayName,
        uid: state.auth.uid,
        email: state.auth.email,
        phoneNumber: state.auth.phoneNumber,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);