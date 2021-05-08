import React, {useState} from 'react';

import Canvas from "../canvas/Canvas";
import Controls from "../canvas/Controls";

import LZString from "lz-string";
import Clipboard from "../buttons/Clipboard";

function CreatDrawings() {
    const [controls, setControls] = useState({
        onChange: null,
        loadTimeOffset: 5,
        lazyRadius: 2,
        brushRadius: 10,
        catenaryColor: "#0a0302",
        gridColor: "rgba(150,150,150,0.17)",
        hideGrid: true,
        canvasWidth: 400,
        canvasHeight: 400,
        disabled: false,
        imgSrc: "",
        saveData: "",
        immediateLoading: false,
        hideInterface: false
    });
    const [color, setColor] = useState("#0a0302");
    const [saveableCanvas, setSaveableCanvas] = useState(null);
    const [dataString, setDataString] = useState();

    const submitDrawing = (drawingData) => {
        localStorage.setItem(
            "savedDrawing",
            drawingData
        );
        setDataString(LZString.decompressFromUTF16(drawingData));
        console.log(LZString.decompressFromUTF16(drawingData));
    };

    return (
        <React.Fragment>
            <div style={{display: "flex", alignItems: "top", justifyContent: "center"}}>
                <Controls
                    controls={controls}
                    setControls={setControls}
                    saveableCanvas={saveableCanvas}
                    setColor={setColor}
                    color={color}
                    submitDrawing={submitDrawing}
                />
                <Canvas
                    controls={controls}
                    setSaveableCanvas={setSaveableCanvas}
                    color={color}
                />
            </div>
            <Clipboard text={"Drawing Data: "} copy={dataString}/>
        </React.Fragment>
    );
}

export default CreatDrawings;
