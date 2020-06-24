import React, { useState, useEffect } from 'react'
import './App.css'
import { AppBar, Toolbar, IconButton, Typography, Card } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Batteries from './Batteries'
import Depth from './Depth'
import Imu from './Imu'
import VideoPlayer from './VideoPlayer'

import {BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20} from '@material-ui/icons'
const chargeIcons = [
  {key: 0, percent: 100, icon: <BatteryFull fontSize='large'color='secondary'/>},
  {key: 1, percent: 80, icon: <Battery80 fontSize='large' color='secondary'/>},
  {key: 2, percent: 50, icon: <Battery50  fontSize='large' color='secondary'/>},
  {key: 3, percent: 20, icon: <Battery20 fontSize='large' color='error'/>},
  {key: 4, percent: null, icon: <BatteryUnknown fontSize='large' color='error'/>}    
]
const url = 'exampleurl'
const isActive = false

const App = () => {
  
  const [stateDepth, setStateDepth] = useState(500)
  const [controlsDepth, setControlsDepth] = useState(200)
  const [videoSrc, setVideoSrc] = useState('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8')
  const [batteries, setBatteries] = useState([
    {name: 'battery1', charge: 68, icon: chargeIcons[1].icon},
    {name: 'battery2', charge: 1, icon: chargeIcons[3].icon},
    {name: 'battery3', charge: 100, icon: chargeIcons[0].icon},
    {name: 'battery4', charge: null, icon: chargeIcons[1].icon},
  ])

  // retrieve information from robo_thoughts
  const userAction = () => {
    // json object required to access robo_thoughts backend
    let requestBody = {
      'request': [
        {
          'data': 'Controls_Depth'
        },
        {
          'data': 'State_Depth'
        },
        {
          'data': 'Bboxes'
        },
        {
          'data': 'Dvl'
        },
        {
          'data': 'Imu'
        },
        {
          'data': 'Object'
        },
        {
          'data': 'Object'
        }
      ]
    }
    // send a post request to robo_thoughts backend containing the above json object
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: requestBody
    }).then(response => {
      //extract JSON from the http response
      response.json() 
    })
    
  }

  useEffect(() => {
    if (isActive) {
      setInterval(userAction, 1000) // call userAction every 1000 milliseconds
    } else {
      
    }
  }, [])

  return (    
    <div className="App">
      <header className="App-header">

      <AppBar position="fixed">
        <Toolbar color='primary'>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon color='secondary'/>
    </IconButton>
    <Typography variant="h6">
      {/* add link tag to ous uwrt */}
      robo_thoughts
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />  
      <Batteries batteryArray={batteries} />
      <Depth 
        stateDepth={stateDepth}
        controlsDepth={controlsDepth}
      />
      <Imu depth={stateDepth}/>
      <VideoPlayer src={videoSrc} />
      </header>
    </div>
  )
}

export default App