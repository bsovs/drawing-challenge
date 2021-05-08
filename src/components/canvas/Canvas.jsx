import React, {useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw-io";
import {useWindowSize} from "../../hooks/useWindowSize";
import useCanvasSize from "../../hooks/useCanvasSize";

const Canvas = props => {
    const size = useWindowSize();
    const [width, height] = useCanvasSize(props.size || size);
    const style = {border: "1px dashed #ccc", margin: "20px 0", width: width, height: height};

    return (
        <div style={{...style, ...props.style}}>
            <CanvasDraw
                ref={canvasDraw => (props.setSaveableCanvas(canvasDraw))}
                {...props.controls}
                brushColor={props.color}
                canvasWidth={width}
                canvasHeight={height}
                onChange={props.onChange}
                updateData={props.controls?.disabled && props.updateData}
            />
        </div>
    );
}
export default Canvas;