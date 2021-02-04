import React, {useEffect, useState} from 'react';

import '../App.css';
import NavBar from "../nav/NavBar";
import Typography from "@material-ui/core/Typography";
import PlayButton from "../buttons/PlayButton";
import Button from "@material-ui/core/Button";
import {useHistory, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";

function Home(props) {
    const history = useHistory();
    const [gameId, setGameId] = useState();
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setGameId('');
        }
        if (focused) {
            setError(null);
        }
    }, [error, focused]);

    if (props.isAuthenticated) {

        const joinCustomError = (gameId?.length !== 24 && gameId?.length > 0);
        const handleChange = (event) => {
            setGameId(event.target.value);
        };
        const handleFocus = (event) => {
            setFocused(event.type === "focus");
        };

        return (
            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                height: '100%'
            }}>

                <Typography variant="h4" component="div">
                    Welcome, {props.displayName}!
                </Typography>
                <Typography variant="h6" component="div">
                    Click one of the options below to get started
                </Typography>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                            <TextField id="standard-basic" label="GameID" variant="standard"
                                       value={gameId}
                                       onChange={handleChange}
                                       onFocus={handleFocus}
                                       onBlur={handleFocus}
                                       error={joinCustomError || error}
                                       helperText={error ? 'Invalid Code' : 'Enter 24 Digit Code'}
                                       inputProps={{pattern: '^[a-zA-Z0-9]+$', maxlength: "24", size: "24"}}
                            />
                            <PlayButton
                                gameId={gameId}
                                disabled={joinCustomError || gameId?.length == 0}
                                private={true}
                                text={'JOIN A FRIEND'}
                                setError={setError}
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                        <PlayButton
                            gameId={null}
                            private={true}
                            text={'CREATE PRIVATE'}
                        />
                        <PlayButton
                            gameId={null}
                            private={false}
                            text={'JOIN RANDOM GAME'}
                        />
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                        <Button color="primary"
                                variant="contained"
                                onClick={() => history.push('/how-to-play')}>
                            How to play ?
                        </Button>
                    </div>
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            height: '100%'
        }}>
            <Typography variant="h3" component="div">
                Welcome to Drawing Challenge!
            </Typography>
            <Typography variant="h6" component="div">
                Login or Signup to get started
            </Typography>
            <Button color="primary"
                    variant="contained"
                    onClick={() => history.push('/auth')}>
                Login / Signup
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        loading: state.auth.loading,
        displayName: state.auth.displayName,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));