import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React from "react";
import {withRouter, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import * as actions from "../../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faGem, faHome, faHouseUser} from "@fortawesome/free-solid-svg-icons";
import logo from "../../resources/drawing.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    display: {
        paddingRight: theme.spacing(2),
    }
}));

const NavBar = props => {
    const classes = useStyles();
    const history = useHistory();
    const login = () => history.push('/auth');
    const profile = () => history.push('/profile');
    const home = () => history.push('/');
    const vote = () => history.push('/vote');
    const myGames = () => history.push('/profile/games');

    const howToPlay = (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>
            <Button color="primary"
                    variant="contained"
                    onClick={() => history.push('/how-to-play')}>
                How to play ?
            </Button>
        </div>
    );

    const authButtons = (
        <React.Fragment>
            <Typography variant="h6" className={classes.display} component="div">
                <Button color="primary"
                        variant="contained"
                        onClick={vote}>
                    VOTE
                </Button>
            </Typography>
            <Typography variant="h6" className={classes.display} component="div">
                <Button color="primary"
                        variant="contained"
                        onClick={myGames}>
                    MY GAMES
                </Button>
            </Typography>
            <Typography variant="h6" className={classes.display} component="div">
                Coins: {props.coins || 0}
                <FontAwesomeIcon icon={faCoins} size="" fixedWidth fixedHeight color={'#FFD700'}/>
            </Typography>
            <Typography variant="h6" className={classes.display} component="div">
                Gems: {props.gems || 0}
                <FontAwesomeIcon icon={faGem} size="" fixedWidth fixedHeight color={'#ed58fc'}/>
            </Typography>
        </React.Fragment>
    );

    const profileButtons = (
        <React.Fragment>
            <Typography variant="h6" className={classes.display} component="div">
                Welcome, {props.displayName}
            </Typography>
            <Typography variant="h6" className={classes.display} component="div">
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={profile}
                >
                    <FontAwesomeIcon icon={faHouseUser} size="" fixedWidth fixedHeight
                                     color={'#3f51b5'}/>
                </IconButton>
            </Typography>
        </React.Fragment>
    );

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>

                    <Typography variant="h6" className={classes.display} component="div">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={home}
                        >
                            <img src={logo} width={48} height={48}/>
                        </IconButton>
                    </Typography>

                    {props.isAuthenticated && authButtons}

                    {!props.isAuthenticated && howToPlay}

                    <Typography variant="h4" className={classes.title} component="div" style={{textAlign: 'center'}}>
                        {!props.isAuthenticated && 'Welcome to Drawing Challenge!'}
                    </Typography>

                    {props.isAuthenticated && profileButtons}
                    <Button color="primary"
                            variant="contained"
                            onClick={props.isAuthenticated ? props.logout : login}>
                        {props.isAuthenticated ? 'Logout' : 'Login / Signup'}
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.accessToken != null,
        displayName: state.auth.displayName,
        coins: state.auth.coins,
        gems: state.auth.gems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));