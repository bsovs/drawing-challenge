import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../../axios/axios-config";

const PlayButton = props => {

    const joinGame = () => {
        axios.post('/api/game/play', {
            user_id: props.uid,
            game_id: props.gameId
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
                    onClick={joinGame}
            >
                Play
            </Button>
        </React.Fragment>
    );
}
export default PlayButton;