import React, { useState, useEffect } from 'react'
import './App.css'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Batteries from './Batteries'
import Depth from './Depth'
import Imu from './Imu'
import VideoPlayer from './VideoPlayer'
import {BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20} from '@material-ui/icons'

const chargeIcons = [
  {key: 0, percent: 100, icon: <BatteryFull fontSize='large'color='secondary' />},
  {key: 1, percent: 80, icon: <Battery80 fontSize='large' color='secondary' />},
  {key: 2, percent: 50, icon: <Battery50  fontSize='large' color='secondary' />},
  {key: 3, percent: 20, icon: <Battery20 fontSize='large' color='error' />},
  {key: 4, percent: null, icon: <BatteryUnknown fontSize='large' color='error' />}    
]
const url = 'exampleurl'
const isActive = false

const App = () => {
  
  const [stateDepth, setStateDepth] = useState(500)
  const [controlsDepth, setControlsDepth] = useState(200)
  const [videoSrc] = useState('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8')
  const [batteries] = useState([
    {name: 'battery1', charge: 68, icon: chargeIcons[1].icon},
    {name: 'battery2', charge: 1, icon: chargeIcons[3].icon},
    {name: 'battery3', charge: 100, icon: chargeIcons[0].icon},
    {name: 'battery4', charge: null, icon: chargeIcons[1].icon},
  ])

  // retrieve information from robo_thoughts backend
  const userAction = () => {
    // json object required by robo_thoughts backend
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
      //extract JSON from the post response
      response = response.json().data
      setControlsDepth(response.find(element => element.hasOwnProperty('Controls_Depth')))
      setStateDepth(response.find(element => element.hasOwnProperty('State_Depth'))) 
    })
    
  }

  // const updateSampleData = () => {
    
  // }

  useEffect(() => {
    if (isActive) {
      setInterval(userAction, 1000) // call userAction every 1000 milliseconds
    } else {
      console.warn(`
      ----------------------------------------
      Running in offline mode with sample data
      ----------------------------------------
      `)
      // var stateDepthCount = 0
      // var controlDepthCount = 20
      // var charges = [100, 50, 90, 46]
      // const interval = setInterval(() => {
      //   setStateDepth(stateDepthCount+=0.1)
      //   setControlsDepth(controlDepthCount-=0.1)
      // }, 1000);
  
      // return () => clearInterval(interval);
    }
  }, [])

  useEffect(()=> {
    batteries.map(battery => {
      battery.icon = getBatteryIcon(battery.charge)
    })
  }, [batteries])

  const getBatteryIcon = (charge) => {
    if(charge !== null) {
          // find the battery icon that matches closest to the current charge
          const closest = [100, 80, 50, 20].reduce((a, b) => {
            return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
          })
    
          const key = chargeIcons.findIndex(  elem => elem.percent === closest )
          setIcon( chargeIcons[key].icon )
        } else {
          console.info( 'charge - ', charge)
        }
  }

  return (    
    <div className="App">
      <header className="App-header">

      <AppBar position="fixed">
        <Toolbar color='primary'>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon color='secondary'/>
    </IconButton>
    <Typography variant="h6">
      {/* add link tag to osu uwrt */}
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