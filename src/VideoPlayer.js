import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import videojs from 'video.js'
import { Card, Box, IconButton, Typography, Button } from '@material-ui/core'
import 'video.js/dist/video-js.css'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  player: {
    width: '100%',    
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap', 
    position: 'relative' 
  },
  video: {
    position: 'absolute',
    objectFit: 'cover',
    // marginTop: '68px',
    // width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: '4px',
    left: '4px',
    // display: 'flex', 
    // width: '100%',
    // height: '400px',
    // flexWrap: 'wrap',
    
  },
  centerControls: {
    width: '100%',  
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-end',

  },
  lowerControls: {
    width: '100%',
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',

  }   
}))

const VideoPlayer = ({ src }) => {
  const playerRef = useRef()
  const imgRef = useRef()
  const classes = useStyles()
  const [width, setWidth] = useState(0)
  const [isLive] = useState(true)

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(playerRef.current.clientWidth)
      // imgRef.current.height = width * 9 / 16
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
        <Box className={classes.player} ref={playerRef} height={width * 9 / 16}>              
          <img              
              className={classes.video}                           
              src={src}                           
              height={width * 9 / 16}
          />          
          <Box className={classes.controls}>                                    
            <Button size="small" variant="contained" color="primary">
              Live
            </Button>        
          </Box>     
        </Box>  
  )
}

export default VideoPlayer