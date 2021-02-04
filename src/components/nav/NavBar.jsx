import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlayButton from "../buttons/PlayButton";
import React from "react";
import {withRouter, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import * as actions from "../../store/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faGem, faHome, faHouseUser} from "@fortawesome/free-solid-svg-icons";

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
    const myGames = () => history.push('/profile/games')

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
                            <FontAwesomeIcon icon={faHome} size="sm" fixedWidth fixedHeight color={'#000'}/>
                        </IconButton>
                    </Typography>

                    {props.isAuthenticated && (
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
                    )}

                    <Typography variant="h6" className={classes.title} component="div">

                    </Typography>

                    {props.isAuthenticated && (
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
                    )}
                    <Button color="primary"
                            variant="contained"
                            onClick={props.isAuthenticated ? props.logout : login}>
                        {props.isAuthenticated ? 'Logout' : 'Login'}
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