import React, {useContext, useEffect} from "react";
import CanvasDraw from "react-canvas-draw";
import {useWindowSize} from "../../hooks/useWindowSize";
import LZString from "lz-string";
import VoteButton from "../buttons/VoteButton";
import axios from "../../axios/axios-config";

const Vote = props => {
    const size = useWindowSize();

    return (
        <div>
            <CanvasDraw
                disabled
                hideGrid
                canvasWidth={size.width/2}
                canvasHeight={size.width/2}
                saveData={LZString.decompress(localStorage.getItem("savedDrawing"))}
            />
            <VoteButton
                gameId={props.gameId}
                voteId={props.voteId}
                uid={props.uid}
            />
        </div>
    );
}
export default Vote;