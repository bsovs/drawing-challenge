import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../../axios/axios-config";

const VoteButton = props => {

    const vote = () => {
        axios.post('/api/game/vote', {
            user_id: props.uid,
            game_id: props.gameId,
            vote_id: props.voteId,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="primary"
                    onClick={vote}
            >
                Vote
            </Button>
        </React.Fragment>
    );
}
export default VoteButton;