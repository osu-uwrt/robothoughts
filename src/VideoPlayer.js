import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import { Card, Box } from '@material-ui/core'
import 'video.js/dist/video-js.css'

const VideoPlayer = ({ src }) => {
  const playerRef = useRef();

  return (
        <Box className='VideoPlayer' maxWidth='600px'>
        <Card>
          this is the video player :D
            <img
              src={src}
              ref={playerRef} 
            />
          this is also the video player :D
        </Card>
      </Box>
  )
}

export default VideoPlayer