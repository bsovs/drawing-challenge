import React, {useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw";
import {useWindowSize} from "../../hooks/useWindowSize";
import useCanvasSize from "../../hooks/useCanvasSize";

const Canvas = props => {
    const size = useWindowSize();
    const [width, height] = useCanvasSize(size);

    return (
        <div style={{border: "1px dashed #ccc", margin: "20px 0", width: width, height: height}}>
            <CanvasDraw
                ref={canvasDraw => (props.setSaveableCanvas(canvasDraw))}
                {...props.controls}
                brushColor={props.color}
                canvasWidth={width}
                canvasHeight={height}
            />
        </div>
    );
}
export default Canvas;