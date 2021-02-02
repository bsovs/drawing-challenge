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
            flexAlign: 'column',
            alignItems: "center",
            justifyContent: "center",
            height: '100%'
        }}>
            <Typography variant="h6" component="div">
                {props.isAuthenticated
                    ? (<React.Fragment>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <TextField id="standard-basic" label="GameID" variant="standard"
                                       value={gameId}
                                       onChange={handleChange}
                                       onFocus={handleFocus}
                                       onBlur={handleFocus}
                                       error={joinCustomError || error}
                                       helperText={error ? 'Invalid Code' : 'Enter 24 Digit Code'}
                                       inputProps={{ pattern: '^[a-zA-Z0-9]+$', maxlength: "24", size: "24" }}
                            />
                            <PlayButton
                                gameId={gameId}
                                disabled={joinCustomError || gameId?.length == 0}
                                private={true}
                                text={'JOIN A FRIEND'}
                                setError={setError}
                            />
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
                    </React.Fragment>)
                    : (
                        <Button color="primary"
                                variant="contained"
                                onClick={() => history.push('/auth')}>
                            Login / Signup
                        </Button>
                    )
                }
            </Typography>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));