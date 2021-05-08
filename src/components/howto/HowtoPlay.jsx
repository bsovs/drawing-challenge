import React, {useState} from "react";
import Controls from "../canvas/Controls";
import Canvas from "../canvas/Canvas";
import {useWindowSize} from "../../hooks/useWindowSize";
import TextField from "@material-ui/core/TextField";
import PlayButton from "../buttons/PlayButton";
import ReactJoyride, {EVENTS} from 'react-joyride';
import LZString from "lz-string";
import Countdown from "react-countdown";
import LinearProgressWithLabel from "../loading/LinearProgressWithLabel";

const HowToPlay = (props) => {

    const steps = [
        {
            content: (
                <>
                    <h2>Let's Get Started</h2>
                    <p>Take a tour of this demo page</p>
                </>
            ),
            placement: 'center',
            locale: {skip: 'Exit'},
            target: 'body',
        },
        {
            content: 'You can play with friends using a custom code, or get matched up against anyone online.',
            placement: 'bottom-start',
            target: '#play-buttons',
            title: 'Start A game',
            locale: {skip: 'Exit'},
        },
        {
            title: 'Brush Controls',
            content: (
                <>
                    <h3>You adjust your brush here</h3>
                </>
            ),
            target: '.controls',
            placement: 'top',
            locale: {skip: 'Exit'},
        },
        {
            title: 'Time Limit',
            content: (
                <>
                    <h3>Make sure you complete before time runs out!</h3>
                </>
            ),
            target: '#time-limit',
            placement: 'bottom',
            locale: {skip: 'Exit'},
        },
        {
            title: 'Your Canvas',
            content: (
                <>
                    <h3>Now You Can Get Drawing</h3>
                    <p>Try it out!</p>
                </>
            ),
            target: '#canvas',
            placement: 'top',
            locale: {skip: 'Exit'},
        },
    ];
    const [run, setRun] = useState(true);
    const handleJoyrideCallback = (data) => {
        const {joyride} = props;
        const {type} = data;

        if (type === EVENTS.TOUR_END && run) {
            // Need to set our running state to false, so we can restart if we click start again.
            setRun(false);
        }

        if (typeof data.callback === 'function') {
            data.callback(data);
        } else {
            console.group(type);
            console.log(data); //eslint-disable-line no-console
            console.groupEnd();
        }
    };

    const joyride = (
        <ReactJoyride
            continuous
            scrollToFirstStep
            showProgress
            showSkipButton
            run={run}
            steps={steps}
            styles={{
                options: {
                    zIndex: 10000,
                },
            }}
            callback={handleJoyrideCallback}
        />
    );

    const gameButtons = (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            height: '100%'
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                    <TextField id="standard-basic" label="GameID" variant="standard"
                               helperText={'Enter 24 Digit Code'}
                               inputProps={{pattern: '^[a-zA-Z0-9]+$', maxlength: "24", size: "24"}}
                    />
                    <PlayButton
                        disabled={true}
                        private={true}
                        text={'JOIN A FRIEND'}
                        joinGame={()=>{}}
                    />
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
                <PlayButton
                    gameId={null}
                    private={true}
                    text={'CREATE PRIVATE'}
                    joinGame={()=>{}}
                />
                <PlayButton
                    gameId={null}
                    private={false}
                    text={'JOIN RANDOM GAME'}
                    joinGame={()=>{}}
                />
            </div>
        </div>
    );

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

    const timeLimit = 60;
    const [date] = useState(Date.now() + timeLimit * 1000);
    const Completionist = () => <span>You are good to go!</span>;
    const countdownRenderer = ({minutes, seconds, completed}) => {
        seconds += 60 * minutes;
        if (completed) {
            return <Completionist/>;
        } else {
            return (
                <>
                    <span>{seconds} seconds</span>
                    <span style={{width: '50%'}}>
                    <LinearProgressWithLabel value={100 * (seconds - timeLimit) * (-1) / timeLimit}/>
                </span>
                </>
            );
        }
    };
    const submitDrawing = () => {
    };
    const {width, height} = useWindowSize();
    const canvas = (<>
        <div id="time-limit" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Countdown
                date={date}
                renderer={countdownRenderer}
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
                size={{width: width / 2, height: height / 2}}
            />
        </div>
    </>);

    return (
        <div style={{display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", marginBottom: '50px'}}>
            {joyride}
            <h1>1. Go to the Homepage and Select a Game</h1>
            <div id={'play-buttons'}>{gameButtons}</div>
            <h1>2. Get Drawing!</h1>
            <div id={'canvas'} style={{width: '90%', border: "1px dashed #ccc"}}>{canvas}</div>
            <h1>3. Earn Rewards</h1>
            <div id={'rewards'}>
                <h3>Earn rewards for winning games and for voting on other peoples matchups.</h3>
            </div>
        </div>
    );
}
export default HowToPlay;