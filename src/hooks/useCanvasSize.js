import {useEffect, useState} from "react";

const useCanvasSize = (size) => {

    const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});

    useEffect(() => {
        const controlWidth = size.width / 6;
        const width = size.width < 800 ? 800 - controlWidth : (size.width > 1600 ? 1600 - controlWidth : size.width - controlWidth);
        const height = width * 2 / 3;

        setCanvasSize({width: width, height: height});
    }, [size]);

    return [canvasSize.width, canvasSize.height];
}
export default useCanvasSize;