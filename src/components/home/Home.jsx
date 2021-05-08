import React, {useEffect, useState} from 'react';

import '../App.css';
import LZString from "lz-string";
import Typography from "@material-ui/core/Typography";
import PlayButton from "../buttons/PlayButton";
import Button from "@material-ui/core/Button";
import {useHistory, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import DisplayCanvas from "../canvas/DisplayCanvas";
import {drawingMocks, mockPrompt} from "../admin/MockDrawings";
import logo from "../../resources/logo.png";
import {useWindowSize} from "../../hooks/useWindowSize";

function Home(props) {
    const history = useHistory();
    const [gameId, setGameId] = useState();
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);

    const {width, height} = useWindowSize();

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
                            disabled={joinCustomError || !gameId || gameId.length === 0}
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

    const howToPlay = (
        <Button color="primary"
                variant="contained"
                onClick={() => history.push('/how-to-play')}
                style={{margin: '0 10px'}}>
            How to play ?
        </Button>
    );
    const getStarted = (
        <Button color="primary"
                variant="contained"
                onClick={() => history.push('/auth')}
                style={{margin: '0 10px'}}>
            Get Started
        </Button>
    );

    const logoDim = width < 300 ? width : 300;
    const scaledLogo = (<img src={logo} width={logoDim} height={logoDim}/>);

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            height: '100%'
        }}>

            {scaledLogo}

            <Typography variant="h6" component="div">
                Login or Signup to get started
            </Typography>

            <div style={{display: 'flex'}}>
                {getStarted}
                {howToPlay}
            </div>

            <div style={{width: '90%', border: "1px dashed #ccc", margin: '50px auto'}}>
                <h2 style={{textAlign: 'center'}}>Draw This: "{mockPrompt}"</h2>
                <span style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DisplayCanvas drawing={LZString.compressToUTF16(drawingMocks[0])}/>
                        <div>By: Artist_11</div>
                        <div>Votes: <b>33</b></div>
                    </span>

                    <h3>vs.</h3>

                    <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <DisplayCanvas drawing={LZString.compressToUTF16(drawingMocks[1])}/>
                        <div>By: JustForFunXD</div>
                        <div>Votes: <b>7</b></div>
                    </span>
                </span>
            </div>
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