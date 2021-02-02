import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    gameId: null,
    clicked: true
};

const voted = (state, action) => {
    return updateObject(state, {
        gameId: null,
        clicked: action.clicked
    });
};

const queued = (state, action) => {
    return updateObject(state, {
        gameId: action.gameId,
        clicked: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VOTED:
            return voted(state, action);
        case actionTypes.QUEUED:
            return queued(state, action);
        default:
            return state;
    }
};

export default reducer;