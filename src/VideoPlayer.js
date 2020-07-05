import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import videojs from 'video.js'
import { Card, Box } from '@material-ui/core'
import 'video.js/dist/video-js.css'

const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    // fill: true,
    // fluid: true,
    // preload: 'auto',
    // html5: {
    //   hls: {
    //     enableLowInitialPlaylist: true,
    //     smoothQualityChange: true,
    //     overrideNative: true,
    //   },
    // },
  }
  const videoRef = useRef(null)

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, 
      {
      ...options,
      controls: true,
      autoplay: true,
      sources: [src],
      liveui: true,
    }, [])

    // setPlayer(vjsPlayer)

    // return () => {
    //   if (player !== null) {
    //     player.dispose()
    //   }
    // }
  })

  // useEffect(() => {
  //   if (player !== null) {
  //     // player.src({ src })
  //   }
  // }, [])

  return videoRef
}

const VideoPlayer = ({ src, controls, autoplay }) => {
  const playerRef = usePlayer({ src, controls, autoplay })

  return (
    <Box className='VideoPlayer' maxWidth='600px'>
      <Card>
        this is the video player :D
        <div data-vjs-player>
          <video ref={playerRef} className="video-js" />
        </div>
        this is also the video player :D
      </Card>
    </Box>
  )
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
}

export default VideoPlayer