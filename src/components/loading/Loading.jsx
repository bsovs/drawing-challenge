import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = props => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", overflow: 'hidden'}}>
            <CircularProgress />
        </div>
    );
}
export default Loading;