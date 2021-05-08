import LZString from "lz-string";
import CanvasDraw from "react-canvas-draw-io";
import React from "react";
import {useWindowSize} from "../../hooks/useWindowSize";
import useCanvasSize from "../../hooks/useCanvasSize";

const DisplayCanvas = ({drawing, updateData, immediateLoading}) => {
    const size = useWindowSize();
    const [width, height] = useCanvasSize(size);

    function decompress(drawing) {
        try {
            return LZString.decompressFromUTF16(drawing);
        } catch (e) {
            return '';
        }
    }

    return (
        <CanvasDraw
            disabled
            hideGrid
            hideInterface
            style={{border: "1px dashed #ccc", margin: "20px 0"}}
            canvasWidth={width / 2}
            canvasHeight={height / 2}
            saveData={drawing ? decompress(drawing) : null}
            updateData={updateData}
            immediateLoading={immediateLoading}
        />
    );
}
export default DisplayCanvas;