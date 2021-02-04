import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Prompt = props => {
    return (
        <span style={{textAlign: 'center'}}>
            <h2>DRAW THIS</h2>
            <h3>{props.prompt || (<CircularProgress/>)}</h3>
        </span>
    );
}
export default Prompt;