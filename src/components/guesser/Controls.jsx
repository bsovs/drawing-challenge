import React, {useState} from "react";
import {upperCase} from "lodash";
import LZString from "lz-string";
import {CirclePicker, CompactPicker, SketchPicker, SliderPicker} from 'react-color';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {useWindowSize} from "../../hooks/useWindowSize";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faMinus} from "@fortawesome/free-solid-svg-icons/faMinus";
import Avatar from "@material-ui/core/Avatar";

const Controls = props => {
    const size = useWindowSize();
    const boxHeight = size.height < 1200 ? size.height / 12 : 100;

    const colorPicker = (picker) => {
        switch (upperCase(picker)) {
            case "SLIDER":
                return (<div style={{width: 400}}>
                    <SliderPicker
                        color={props.color}
                        onChangeComplete={(color) => {
                            const {r, g, b, a} = color.rgb;
                            props.setColor(`rgb(${r},${g},${b},${a})`)
                        }}
                    />
                </div>);
            case "SKETCH":
                return (
                    <SketchPicker
                        color={props.color}
                        onChangeComplete={(color) => {
                            const {r, g, b, a} = color.rgb;
                            props.setColor(`rgb(${r},${g},${b},${a})`)
                        }}
                    />
                );
            case "COMPACT":
                return (<CompactPicker
                    color={props.color}
                    onChangeComplete={(color) => {
                        const {r, g, b, a} = color.rgb;
                        props.setColor(`rgb(${r},${g},${b},${a})`)
                    }}
                />);
            default:
                return (
                    <CirclePicker
                        heihgt={boxHeight}
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
                    />);
        }
    }

    const [picker, setPicker] = useState();
    const [pickerOpen, setPickerOpen] = useState(false);

    const handleOpen = (picker) => {
        setPickerOpen(true);
        setPicker(picker);
    };
    const handleClose = () => {
        setPickerOpen(false);
        setPicker(null);
    };

    return (<div className={"flex-center"} style={{alignItems: 'flex-start'}}>
            <div className={"controls"} style={{height: boxHeight}}>
                {props.submit !== false && (
                    <Button
                        onClick={() => {
                            props.submitDrawing(LZString.compressToUTF16(props.saveableCanvas.getSaveData()));
                        }}
                    >
                        Submit
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    onClick={() => {
                        if(!disabled) props.saveableCanvas.clearCanvas();
                    }}
                >
                    Clear
                </Button>
                <Button
                    disabled={disabled}
                    onClick={() => {
                        if(!disabled) props.saveableCanvas.undo();
                    }}
                >
                    Undo
                </Button>
            </div>

            <div className={"controls"}>
                <Box sx={{height: boxHeight}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Brush Radius
                    </Typography>
                    <Slider
                        defaultValue={props.controls.brushRadius}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        min={1}
                        max={50}
                        valueLabelDisplay="auto"
                        value={props.controls.brushRadius}
                        onChange={e =>
                            props.setControls({...props.controls, brushRadius: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>
            </div>

            <div className={"controls"}>
                <Box sx={{height: boxHeight}}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Chain Length
                    </Typography>
                    <Slider
                        defaultValue={props.controls.lazyRadius}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={0}
                        max={20}
                        valueLabelDisplay="auto"
                        value={props.controls.lazyRadius}
                        onChange={e =>
                            props.setControls({...props.controls, lazyRadius: parseInt(e.target.value, 10)})
                        }
                    />
                </Box>
            </div>

            <div className={"controls"}>
                {
                    colorPicker(props.colorPicker)
                }
            </div>

            <div className={"controls"}>
                <Avatar variant="contained"
                        color={"primary"}
                        onClick={() => pickerOpen ? handleClose() : handleOpen("SKETCH")}>
                    <FontAwesomeIcon icon={pickerOpen ? faMinus : faPlus}
                                     size="xl" fixedWidth fixedHeight
                                     color={'#fff'}/>
                </Avatar>
                <div style={{position: 'fixed', transform: 'translate(40px, -100%)', zIndex: '100'}}>
                    {pickerOpen && colorPicker(picker)}
                </div>
            </div>

        </div>
    );
}
export default Controls;