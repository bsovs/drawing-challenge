import React from "react";
import CanvasDraw from "react-canvas-draw";
import {useWindowSize} from "../../hooks/useWindowSize";

const Canvas = props => {
    const size = useWindowSize();

    return (
        <React.Fragment>
            <CanvasDraw
                ref={canvasDraw => (props.setSaveableCanvas(canvasDraw))}
                {...props.controls}
                brushColor={props.color}
                canvasWidth={size.width}
                canvasHeight={size.height}
            />
        </React.Fragment>
    );
}
export default Canvas;