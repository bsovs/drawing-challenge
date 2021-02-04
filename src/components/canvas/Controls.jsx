import React from "react";
import LZString from "lz-string";
import {CirclePicker} from 'react-color';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from "../../axios/axios-config";
import Button from "@material-ui/core/Button";
import {useWindowSize} from "../../hooks/useWindowSize";

const Controls = props => {
    const size = useWindowSize();
    const boxWidth = size.width < 1500 ? size.width / 6 : 300;

    return (<div className={"controls"}>
            <div className={"group"} style={{width: boxWidth}}>
                <Button
                    onClick={() => {
                        props.submitDrawing(LZString.compressToUTF16(props.saveableCanvas.getSaveData()));
                    }}
                >
                    Submit
                </Button>
                <Button
                    onClick={() => {
                        props.saveableCanvas.clear();
                    }}
                >
                    Clear
                </Button>
                <Button
                    onClick={() => {
                        props.saveableCanvas.undo();
                    }}
                >
                    Undo
                </Button>
            </div>

            <div className={"group"}>
                <Box sx={{width: boxWidth}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Width
                    </Typography>
                    <Slider
                        defaultValue={500}
                        getAriaValueText={props.width}
                        aria-labelledby="discrete-slider-small-steps"
                        step={100}
                        marks
                        min={0}
                        max={1000}
                        valueLabelDisplay="auto"
                        value={props.width}
                        onChange={e =>
                            props.setControls({...props.controls, width: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>

                <Box sx={{width: boxWidth}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Height
                    </Typography>
                    <Slider
                        defaultValue={500}
                        getAriaValueText={props.height}
                        aria-labelledby="discrete-slider-small-steps"
                        step={100}
                        marks
                        min={0}
                        max={1000}
                        valueLabelDisplay="auto"
                        value={props.height}
                        onChange={e =>
                            props.setControls({...props.controls, height: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>

                <Box sx={{width: boxWidth}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Brush Radius
                    </Typography>
                    <Slider
                        defaultValue={props.controls.brushRadius}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={30}
                        valueLabelDisplay="auto"
                        value={props.controls.brushRadius}
                        onChange={e =>
                            props.setControls({...props.controls, brushRadius: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>

                <Box sx={{width: boxWidth}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Lazy Radius
                    </Typography>
                    <Slider
                        defaultValue={props.controls.lazyRadius}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={0}
                        max={15}
                        valueLabelDisplay="auto"
                        value={props.controls.lazyRadius}
                        onChange={e =>
                            props.setControls({...props.controls, lazyRadius: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>
            </div>

            <div className={"group"}>
                <CirclePicker
                    width={boxWidth}
                    colors={[
                        "#f44336", "#e91e63",
                        "#9c27b0", "#673ab7",
                        "#3f51b5", "#2196f3",
                        "#03a9f4", "#00bcd4",
                        "#009688", "#795548",
                        "#8bc34a", "#cddc39",
                        "#ffeb3b", "#ffc107",
                        "#ff9800", "#ff5722",
                        "#0a0302", "#ffffff"]}
                    color={props.color}
                    onChangeComplete={(color) => props.setColor(color.hex)}
                />
            </div>

        </div>
    );
}
export default Controls;