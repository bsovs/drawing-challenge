import React from "react";
import VoteButton from "../buttons/VoteButton";
import DisplayCanvas from "../canvas/DisplayCanvas";
import CircularProgress from "@material-ui/core/CircularProgress";

const Vote = props => {
    if (!props.gameId) {
        return (<CircularProgress/>);
    }
    return (
        <div>
            <DisplayCanvas drawing={props.drawing}/>
            <span style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex',  justifyContent: 'center'}}>
                    <VoteButton
                        gameId={props.gameId}
                        voteId={props.voteId}
                    />
                </div>
            </span>
        </div>
    );
}
export default Vote;