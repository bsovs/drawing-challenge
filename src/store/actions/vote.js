import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-config";

export const voteEnd = () => {
    return {
        type: actionTypes.VOTED,
        clicked: true
    };
}

export const voted = (props) => {
    return dispatch => {
        axios.post('/game/vote', {
            game_id: props.gameId,
            vote_id: props.voteId,
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        dispatch(voteEnd());
    }
};

export const queued = (props) => {
    return {
        type: actionTypes.QUEUED,
        ...props
    };
};