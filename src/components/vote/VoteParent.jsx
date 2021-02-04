import React, {useEffect, useState} from 'react';

import '../App.css';
import Vote from "./Vote";
import axios from "../../axios/axios-config";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled, {keyframes} from "styled-components";
import {bounce, headShake} from 'react-animations';
import Prompt from "./Prompt";

const BounceAnimation = keyframes`${bounce}`;
const BounceDiv = styled.div`
  animation: 3s ${BounceAnimation};
`;
const HeadShakeAnimation = keyframes`${headShake}`;
const HeadShakeDiv = styled.div`
  animation: 3s ${HeadShakeAnimation};
`;

function VoteParent(props) {
    const [voteIds, setVoteIds] = useState({userOne: null, userTwo: null});
    const [drawings, setDrawings] = useState({userOne: null, userTwo: null});
    const [prompt, setPrompt] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [slideIn, setSlideIn] = useState(true);
    const [slideOut, setSlideOut] = useState(false);

    useEffect(() => {
        if (props.gameId) {
            axios.get('/game/' + (props.gameId))
                .then(response => {
                    console.log(response.data);
                    setVoteIds({
                        userOne: response.data.users[0].user_id,
                        userTwo: response.data.users[1].user_id
                    });
                    setDrawings({
                        userOne: response.data.users[0].drawing_data,
                        userTwo: response.data.users[1].drawing_data
                    });
                    setPrompt(response.data.prompt);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.response);
                    setError(error.response?.data?.message || 'Error Loading Page :(');
                })
                .finally(() => setSlideIn(true))
        }
    }, [props.gameId]);

    if (error) {
        return (
            <span style={{textAlign: 'center'}}>
                <h2>{error}</h2>
            </span>
        );
    }

    return (<React.Fragment>
            {props.gameId && (
                <Prompt
                    prompt={prompt}
                />
            )
            }
            {(props.gameId && !loading) ?
                (<BounceDiv>
                    <span style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Vote
                            gameId={props.gameId}
                            voteId={voteIds.userOne}
                            drawing={drawings.userOne}
                        />
                        <Vote
                            gameId={props.gameId}
                            voteId={voteIds.userTwo}
                            drawing={drawings.userTwo}
                        />
                    </span>
                </BounceDiv>)
                : (<HeadShakeDiv>
                    <h2 style={{textAlign: 'center'}}>VOTING QUEUE EMPTY. COME BACK LATER!</h2>
                </HeadShakeDiv>)
            }
        </React.Fragment>
    );
}

export default VoteParent;
