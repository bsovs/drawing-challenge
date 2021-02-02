import React, {useEffect, useState} from 'react';

import '../App.css';
import axios from "../../axios/axios-config";
import {useParams, withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import VoteParent from "./VoteParent";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Loading from "../loading/Loading";

function VoteFetcher(props) {
    const [voteQueue, setVoteQueue] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reQueue, setRequeue] = useState(true);
    const { game_id } = useParams();

    useEffect(() => {
        if (game_id) {
            props.queue({gameId: game_id});
            setLoading(false);
        } else if (reQueue) {
            setLoading(true);
            axios.get('/profile/vote-queue')
                .then(response => {
                    setVoteQueue(response.data);
                })
                .catch(error => {
                    console.log(error.response);
                    setError(error.response?.data?.message || 'Error Loading Page :(');
                })
                .finally(() => {
                    setRequeue(false);
                    setLoading(false);
                });
        }
    }, [reQueue]);

    useEffect(() => {
        if (props.clicked && voteQueue.length > 0) {
            props.queue({gameId: voteQueue[0]._id});
            setVoteQueue(voteQueue.slice(1));
        } else if (props.clicked) {

        }
    }, [props.clicked, voteQueue]);

    useEffect(() => {
        if (voteQueue.length <= 0) {
            setRequeue(true);
        }
    }, [voteQueue]);

    if (error) {
        return (
            <span style={{textAlign: 'center'}}>
                <h2>{error}</h2>
            </span>
        );
    }
    if (loading) {
        return (<Loading/>);
    }

    return (
        <VoteParent
            gameId={props.gameId}
        />
    );
}

const mapStateToProps = state => {
    return {
        gameId: state.vote.gameId,
        clicked: state.vote.clicked,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        queue: (props) => dispatch(actions.queued(props))
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(VoteFetcher));
