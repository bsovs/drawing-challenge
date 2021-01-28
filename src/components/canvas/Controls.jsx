import React from "react";
import LZString from "lz-string";
import {CirclePicker} from 'react-color';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from "../../axios/axios-config";
import Button from "@material-ui/core/Button";

const Controls = props => {

    const submitDrawing = (drawingData) => {
        axios.post('/api/game/submit-drawing', {
            user_id: props.uid,
            game_id: props.gameId,
            drawing_data: drawingData
        })
            .then(response => {
                localStorage.setItem(
                    "savedDrawing",
                    response.data.users[1].drawing_data
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (<div className={"controls"}>
            <div className={"group"}>
                <Button
                    onClick={() => {
                        submitDrawing(LZString.compress(props.saveableCanvas.getSaveData()));
                    }}
                >
                    Save
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
                <Box sx={{width: 300}}>
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

                <Box sx={{width: 300}}>
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

                <Box sx={{width: 300}}>
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

                <Box sx={{width: 300}}>
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
                    color={props.color}
                    onChangeComplete={(color) => props.setColor(color.hex)}
                />
            </div>

        </div>
    );
}
export default Controls;