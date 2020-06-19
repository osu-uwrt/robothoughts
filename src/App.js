import React, { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Card } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Battery from './Battery'
import Depth from './Depth'
import Imu from './Imu'

const App = () => {

  const [stateDepth, setStateDepth] = useState(500);
  const [controlsDepth, setControlsDepth] = useState(200);

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

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Card>
          <Battery charge={68}/>
          <Battery charge={1}/>
          <Battery charge={100}/>
          <Battery charge={null}/>
        </Card>
        <Depth 
          stateDepth={stateDepth}
          controlsDepth={controlsDepth}
        />
        <Imu/>
      </header>
    </div>
  )
}

export default App;
