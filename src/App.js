import React, { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Card } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Batteries from './Batteries'
import Depth from './Depth'
import Imu from './Imu'

const App = () => {

  const [stateDepth, setStateDepth] = useState(500)
  const [controlsDepth, setControlsDepth] = useState(200)
  const [batteries, setBatteries] = useState([
    {name: 'battery1', charge: 68},
    {name: 'battery2', charge: 1},
    {name: 'battery3', charge: 100},
    {name: 'battery4', charge: null},
  ])

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
      </header>
    </div>
  )
}

export default App;
