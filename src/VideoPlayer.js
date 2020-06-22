import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import videojs from 'video.js'
import { Card, Box } from '@material-ui/core'
import 'video.js/dist/video-js.css'

// eslint-disable-next-line import/prefer-default-export
const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    fill: true,
    fluid: true,
    preload: 'auto',
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
      sources: [src],
      liveui: true,
    })

    console.log(vjsPlayer)
    setPlayer(vjsPlayer)

    return () => {
      if (player !== null) {
        player.dispose()
      }
    }
  }, [])
  useEffect(() => {
    if (player !== null) {
      player.src({ src })
    }
  }, [src])

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

VideoPlayer.defaultProps = {
  controls: true,
  autoplay: false,
}

export default VideoPlayer