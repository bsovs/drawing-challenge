import LZString from "lz-string";
import CanvasDraw from "react-canvas-draw";
import React from "react";
import {useWindowSize} from "../../hooks/useWindowSize";
import useCanvasSize from "../../hooks/useCanvasSize";

const DisplayCanvas = props => {
    const size = useWindowSize();
    const [width, height] = useCanvasSize(size);

    return (
        <CanvasDraw
            disabled
            hideGrid
            hideInterface
            style={{border: "1px dashed #ccc", margin: "20px 0"}}
            canvasWidth={width / 2}
            canvasHeight={height / 2}
            saveData={LZString.decompress(props.drawing)}
        />
    );
}
export default DisplayCanvas;