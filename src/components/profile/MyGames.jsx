import React, {useEffect, useState} from 'react';

import '../App.css';
import {useHistory, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from "../../axios/axios-config";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import Prompt from "../vote/Prompt";
import DisplayCanvas from "../canvas/DisplayCanvas";
import Loading from "../loading/Loading";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import Clipboard from "../buttons/Clipboard";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function MyGames(props) {
    const history = useHistory();
    const classes = useStyles();
    const {game_id} = useParams();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [prompt, setPrompt] = useState(null);
    const [gameId, setGameId] = useState(null);

    const emptyUser = {drawing_data: null, display_name: null, votes: 0};
    const [userOne, setUserOne] = useState(emptyUser);
    const [userTwo, setUserTwo] = useState(emptyUser);

    const handleOpen = (game) => {
        setOpen(true);
        setUserOne(game.users[0] || emptyUser);
        setUserTwo(game.users[1] || emptyUser);
        setPrompt(game.prompt);
        setGameId(game._id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/profile/games')
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.log(error.response);
                setError(error.response?.data?.message || 'Error Loading Page :(');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (<Loading/>);
    }
    if (!games || games.length <= 0) {
        return (
            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                height: '100%'
            }}>
                <h2>No Games Played</h2>
            </div>
        );
    }

    const gameMapper = games.map(game => {
        return (
            <>
                <ListItem button divider key={game._id} onClick={() => handleOpen(game)} style={{paddingLeft: "20px"}}>
                    <ListItemText primary={"Prompt: " + game.prompt}
                                  secondary={(<Clipboard text={"Game ID: "} copy={game._id}/>)}/>
                </ListItem>
                <Divider/>
            </>
        );
    });

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            height: '100%'
        }}>
            <List component="nav" className={classes.root} aria-label="games list" style={{width: "100%"}}>
                {gameMapper}
            </List>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <Prompt
                        prompt={prompt}
                    />

                    <span style={{
                        display: 'table',
                        margin: '0 auto',
                        borderSpacing: '0 5px'
                    }}>
                        <div style={{display: 'table-row'}}>
                            <Clipboard text={"ID: "} copy={gameId} />
                        </div>
                        <div style={{display: 'table-row'}}>
                            <Clipboard
                                text={"Vote: "}
                                copy={`${window.location.protocol + window.location.host}/vote/${gameId}`}
                            />
                        </div>
                    </span>

                    <span style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                            <DisplayCanvas drawing={userOne.drawing_data}/>
                            <p>User: {userOne.display_name || 'unknown'}</p>
                            <p>Votes: {userOne.votes}</p>
                        </span>
                        <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                            <DisplayCanvas drawing={userTwo.drawing_data}/>
                             <p>User: {userTwo.display_name || 'unknown'}</p>
                            <p>Votes: {userTwo.votes}</p>
                        </span>
                    </span>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        displayName: state.auth.displayName,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);