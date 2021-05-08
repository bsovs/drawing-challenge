import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Canvas from "../canvas/Canvas";
import Controls from "../guesser/Controls";
import {socket} from "../../socketio";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";

import "./chat.css";
import TextField from "@material-ui/core/TextField";
import useCanvasSize from "../../hooks/useCanvasSize";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '25ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    chatItems: {
        flex: 0,
        overflowY: "scroll",
        overflowX: "hidden",
        maxHeight: "500px"
    },
    chatBubble: {
        flex: 1
    }
}));

function Guesser() {
    const {room_id} = useParams();
    const classes = useStyles();

    const [allChat, setAllChat] = useState([]);
    const [participants, setParticipants] = useState([(<>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Barn" src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
                primary="Barn"
                secondary={"Drawn"}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
    </>)]);
    const [isDrawer, setIsDrawer] = useState(false);
    const [displaySocket, setDisplaySocket] = useState('');

    const allChatRef = React.useRef(allChat);
    const participantsRef = React.useRef(participants);
    useEffect(() => {
        allChatRef.current = allChat;
        participantsRef.current = participants;
    });

    const handleNewChat = (user, data, correct) => {
        const newChat = (<ListItem alignItems="center" className={classes.chatBubble}>
            <ListItemAvatar>
                <Avatar alt={`${user}`} src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
                alignItems="center"
                secondary={`${user}: ${data.guess}`}
                color={correct && '#39d739'}
            />
        </ListItem>);
        console.log(user,data, [...allChatRef.current, newChat])
        setAllChat([...allChatRef.current, newChat]);
    };

    const newParticipant = (user, data) => (<>
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt={user} src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
                primary={user}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
    </>);
    const handleNewParticipant = (user, data) => {
        console.log(user,data)
        setParticipants([...participantsRef.current, newParticipant(user, data)]);
    };
    const handleAllParticipants = (users) => {
        console.log(users);
        const _users = Object.values(users).map(user => newParticipant(user.name));
        setParticipants(_users);
    };
    const [timeLeft, setTimeLeft] = useState(0);
    const handleTime = (timeLeft) => {
        setTimeLeft(timeLeft);
    }
    const handleTimeUp = (timeLeft) => {
        setTimeLeft(timeLeft);
        setIsDrawer(false);
        setChatDisables(false);
    }
    const handlerIsDrawer = (res) => {
        console.log("isDrawer", res);
        setIsDrawer(res);
        setChatDisables(!res);
    }

    useEffect(() => {
        socket.removeAllListeners();
        socket.emit("call", "guesser.name", {name: 'brando'}, () => {
            socket.emit("call", "guesser.join", {room_id: room_id}, (err, data) => handleAllParticipants(data));
            socket.on('guesser.guess', handleNewChat);
            socket.on('guesser.join', handleNewParticipant);
            socket.on('guesser.time', handleTime);
            socket.on('guesser.timesUp', handleTimeUp);
            socket.on('guesser.drawer', handlerIsDrawer);
        });
    }, []);

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
        immediateLoading: true,
        hideInterface: false
    });
    const [color, setColor] = useState("rgb(10,3,2)");
    const [saveableCanvas, setSaveableCanvas] = useState(null);

    const handleChange = isDrawer ? (ref, reason) => {
        socket.emit('call', 'guesser.updateDrawing',
            {
                drawing_data: ref.getUpdateData(),
                update_reason: reason,
                room_id: room_id
            });
    } : null;

    useEffect(() => {
        if (!isDrawer) {
            socket.on('guesser.updateDrawing', (data) => {
                setDisplaySocket(data);
            });
        } else {
            socket.removeAllListeners('guesser.updateDrawing');
        }
    }, [isDrawer]);

    const borderStyle = {border: "1px dashed #ccc", margin: "20px"};
    const leaderboard = (<>
        <List className={classes.root} style={borderStyle}>
            <h3 style={{textAlign: 'center'}}>Leaderboard</h3>
            {participants}
        </List>
    </>);

    const [chatValue, setChatValue] = useState('');
    const [chatDisabled, setChatDisables] = useState(isDrawer);
    const handleChatChange = (event) => {
        setChatValue(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('123', chatValue);
        if (!isDrawer) {
            socket.emit('call', 'guesser.guess',
                {
                    guess: chatValue,
                    room_id: room_id
                });
        }
    }
    const chatContainer = React.createRef();
    useEffect(() => {
        const scroll =
            chatContainer.current.scrollHeight -
            chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);
    }, [allChat]);
    const chatModel = (<div className={`${classes.root}  ${classes.chat}`} style={borderStyle}>
        <div/>
        <div>
            <List className={`${classes.chatItems}`} ref={chatContainer}>
                {allChat}
            </List>
            <form onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Guess" variant="standard"
                           autoComplete={false}
                           style={{margin: '10px 20px'}}
                           value={chatValue}
                           onChange={handleChatChange}
                           disabled={chatDisabled}
                />
            </form>
        </div>
    </div>);

    const canvasSize = {width: 1100, height: 1100};
    const controlModel = (
        <Controls
            disabled={!isDrawer}
            controls={controls}
            setControls={setControls}
            saveableCanvas={saveableCanvas}
            setColor={setColor}
            color={color}
            colorPicker={"COMPACT"}
            submit={false}
        />
    );
    const canvas = isDrawer
        ? (
            <Canvas
                controls={controls}
                setSaveableCanvas={setSaveableCanvas}
                color={color}
                onChange={handleChange}
                updateData={null}
                size={canvasSize}
            />
        )
        : (
            <Canvas
                controls={{
                    onChange: null,
                    hideGrid: true,
                    disabled: true,
                    immediateLoading: true,
                    hideInterface: true
                }}
                setSaveableCanvas={setSaveableCanvas}
                updateData={displaySocket}
                size={canvasSize}
            />
        );

    const startRound = () => {
        socket.emit('call', 'guesser.startRound', {room_id}, (err, data) => {
            if(!err) {
                setTimeLeft(data.time);
            }
            else console.log(err);
        });
    };

    return (
        <>
            <button onClick={() => socket.emit("call", "guesser.start", {room_id})}>
                start game
            </button>
            <button onClick={startRound}>
                start round
            </button>
            <p>{timeLeft}</p>

            <div style={{display: "flex", alignItems: "top", justifyContent: "center"}}>
                {leaderboard}
                {canvas}
                {chatModel}
            </div>
            {controlModel}
        </>
    );
}

export default Guesser;
