import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import axios from "../axios/axios-config";

import Canvas from "./canvas/Canvas";
import Controls from "./canvas/Controls";

import './App.css';
import NavBar from "./nav/NavBar";
import Countdown from "react-countdown";
import LinearProgressWithLabel from "./loading/LinearProgressWithLabel";
import LZString from "lz-string";

function App() {
    const location = useLocation();
    const history = useHistory();
    const {game_id} = useParams();

    const [controls, setControls] = useState({
        onChange: null,
        loadTimeOffset: 5,
        lazyRadius: 2,
        brushRadius: 10,
        catenaryColor: "#0a0302",
        gridColor: "rgba(150,150,150,0.17)",
        hideGrid: true,
        canvasWidth: 400,
        canvasHeight: 400,
        disabled: false,
        imgSrc: "",
        saveData: "",
        immediateLoading: false,
        hideInterface: false
    });
    const [color, setColor] = useState("#0a0302");
    const [saveableCanvas, setSaveableCanvas] = useState(null);
    const [prompt, setPrompt] = useState(location.state.prompt || null);

    const timeLimit = 60;
    const [countdown, setCountdown] = useState(Date.now() + timeLimit * 1000);

    useEffect(() => {
        if (!prompt) {
            axios.get('/profile/' + game_id)
                .then(response => {
                    setPrompt(response.data.prompt);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        setCountdown(Date.now() + timeLimit * 1000);
    }, [game_id]);

    const submitDrawing = (drawingData) => {
        axios.post('/game/submit-drawing', {
            game_id: game_id,
            drawing_data: drawingData
        })
            .then(response => {
                localStorage.setItem(
                    "savedDrawing",
                    drawingData
                );
                history.push(`/profile/games/${game_id}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const Completionist = () => <span>You are good to go!</span>;
    const countdownRenderer = ({minutes, seconds, completed}) => {
        seconds += 60 * minutes;
        if (completed) {
            return <Completionist/>;
        } else {
            return (
                <React.Fragment>
                    <span>{seconds} seconds</span>
                    <span style={{width: '50%'}}>
                    <LinearProgressWithLabel value={100 * (seconds - timeLimit) * (-1) / timeLimit}/>
                </span>
                </React.Fragment>
            );
        }
    };

    return (
        <React.Fragment>
            <div style={{display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center"}}>
                <h2>Draw: {prompt}</h2>
                <Countdown
                    date={countdown}
                    renderer={countdownRenderer}
                    onComplete={() => submitDrawing(LZString.compressToUTF16(saveableCanvas.getSaveData()))}
                />
            </div>

            <div style={{display: "flex", alignItems: "top", justifyContent: "center"}}>
                <Controls
                    controls={controls}
                    setControls={setControls}
                    saveableCanvas={saveableCanvas}
                    setColor={setColor}
                    color={color}
                    submitDrawing={submitDrawing}
                />
                <Canvas
                    controls={controls}
                    setSaveableCanvas={setSaveableCanvas}
                    color={color}
                />
            </div>
        </React.Fragment>
    );
}

export default App;
