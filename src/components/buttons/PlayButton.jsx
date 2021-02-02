import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../../axios/axios-config";
import {withRouter} from "react-router-dom";

const PlayButton = props => {
    const path = props.gameId && props.private ? 'join' : (props.private ? 'new' : 'play')

    const joinGame = () => {
        axios.post(`/game/${path}`, {
            game_id: props.gameId,
            is_private: props.private
        })
            .then(response => {
                props.history.push({
                    pathname: '/app/'+response.data._id,
                    state: {
                        prompt: response.data.prompt
                    }
                });
            })
            .catch(error => {
                props.setError(error);
            });
    }

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="primary"
                    onClick={joinGame}
                    className={props.className}
                    disabled={props.disabled}
                    style={{margin: "10px"}}
            >
                {props.text || 'Play'}
            </Button>
        </React.Fragment>
    );
}
export default withRouter(PlayButton);