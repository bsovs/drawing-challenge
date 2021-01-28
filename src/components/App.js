import React, {useEffect, useState} from 'react';

import Canvas from "./canvas/Canvas";
import Controls from "./canvas/Controls";

import './App.css';
import PlayButton from "./buttons/PlayButton";
import Vote from "./vote/Vote";
import axios from "../axios/axios-config";

function App() {

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
    const [color, setColor] = useState();
    const [saveableCanvas, setSaveableCanvas] = useState(null);
    const [auth, setAuth] = useState({uid: null, gameId: null});
    const [voteIds, setVoteIds] = useState({userOne: null, userTwo: null});

    if(!auth) setAuth({uid: 'brando', gameId: '123c'});

    useEffect(() => {
        axios.get('/api/game/' + auth.gameId)
            .then(response => {
                console.log(response.data);
                setVoteIds({
                    userOne: response.data.users[0].user_id,
                    userTwo: response.data.users[1].user_id
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [auth.gameId]);

    return (
        <div className="App">
            <header>
                <PlayButton
                    uid={auth.uid}
                    gameId={auth.gameId}
                />

                <Controls
                    controls={controls}
                    setControls={setControls}
                    saveableCanvas={saveableCanvas}
                    setColor={setColor}
                    color={color}
                    uid={auth.uid}
                    gameId={auth.gameId}
                />
            </header>
            <main>
                <Canvas
                    controls={controls}
                    setSaveableCanvas={setSaveableCanvas}
                    color={color}
                />

                <Vote
                    gameId={auth.gameId}
                    uid={auth.uid}
                    voteId={voteIds.userOne}
                />
                <Vote
                    gameId={auth.gameId}
                    uid={auth.uid}
                    voteId={voteIds.userTwo}
                />
            </main>
            <footer>
                Created by Brandon S.
            </footer>
        </div>
    );
}

export default App;
