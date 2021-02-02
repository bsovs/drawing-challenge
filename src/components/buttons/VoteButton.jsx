import React from "react";
import Button from "@material-ui/core/Button";
import axios from "../../axios/axios-config";
import * as actions from "../../store/actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const VoteButton = props => {

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="primary"
                    onClick={() => props.vote({gameId: (props.gameId || props._gameId), voteId: props.voteId})}
            >
                Vote
            </Button>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        _gameId: state.vote.gameId,
        clicked: state.vote.clicked,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vote: (props) => dispatch(actions.voted(props))
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(VoteButton));