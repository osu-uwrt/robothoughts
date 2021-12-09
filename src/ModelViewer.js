import React, { useState } from 'react'

const ModelViewer = ({parentID, x_rotation, y_rotation, z_rotation}) => {
    const modelViewerID = parentID + "ModelViewer"
    const canvasID = parentID + "canvas"

    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);

    const updateSize  =() => {
        const parent = document.getElementById(parentID);
        const parentPaddingString = getComputedStyle(parent).paddingLeft
        const parentPadding = Number(parentPaddingString.substring(0, parentPaddingString.length - 2))

        setWidth(parent.clientWidth - parentPadding * 2);
        setHeight(width * 9 / 16);
    }

    window.addEventListener('resize', updateSize)
    
    return (
        <div className="ModelViewer" id={modelViewerID} style={{width: width, height: height}}>
            <canvas className='webgl' id={canvasID} x_rotation={x_rotation} y_rotation={y_rotation} z_rotation={z_rotation} style={{width: width, height: height}}></canvas>
        </div>
    )
}


export default ModelViewer
