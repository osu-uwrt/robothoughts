import React, { useState, useEffect } from 'react'
import { BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20 } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography, Box, Card, Divider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'                                                                                                                                                                                                                                                                                                                                                                                                                                          
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import fetch from 'node-fetch'
import Batteries from './Batteries'
import Depth from './Depth'
import Imu from './Imu'
import VideoPlayer from './VideoPlayer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
  videoPlayer: {
    height: '200px',
    backgroundColor: 'red',
  },
  batteries: {
    alignSelf: 'flex-end'
  },
}))

const chargeIcons = [
  {key: 0, percent: 100, icon: <BatteryFull fontSize='large'color='secondary' />},
  {key: 1, percent: 80, icon: <Battery80 fontSize='large' color='secondary' />},
  {key: 2, percent: 50, icon: <Battery50  fontSize='large' color='secondary' />},
  {key: 3, percent: 20, icon: <Battery20 fontSize='large' color='error' />},
  {key: 4, percent: null, icon: <BatteryUnknown fontSize='large' color='error' />}    
]
const url = 'http://127.0.0.1:5000/'
const isActive = true

const App = () => {
  const [videoUrl] = useState('http://0.0.0.0:8080/stream?topic=/puddles/stereo/left/image_rect_color&type=mjpeg&quality=25') 
  const [depth, setDepth] = useState(0)
  const [orientation, setOrientation] = useState()  
  const [batteries] = useState([
    {name: 'battery1', icon: chargeIcons[4].icon},
    {name: 'battery2', icon: chargeIcons[4].icon},
    {name: 'battery3', icon: chargeIcons[4].icon},
    {name: 'battery4', icon: chargeIcons[4].icon},
  ])
  const [team] = useState({
    name: 'OSU Underwater Robotics Team',
    robot: {
      name: 'Puddles', 
      info: `Puddles is the team's newest autonomous underwater vehicle. It made its debut at RoboSub 2019. It is the successor to Maelstrom.`
    },
    github: 'https://github.com/osu-uwrt',
    instagram: 'https://www.instagram.com/osu_uwrt/?hl=en',
    website: 'https://uwrt.engineering.osu.edu/'  
  })

  useEffect(() => {
    if (isActive) {
      fetch(`${url}/video_feed`).then(response => response.json()).then(json => {console.log(json)})
      console.log(videoUrl)
      
      const interval = setInterval(() => {
        requestData()
      }, 500)
      return () => clearInterval(interval)      
    }
  }, [])

  // retrieve information from robo_thoughts backend
  const requestData = () => {
    var data = {
      'request': [
        {'data': 'position'},
        {'data': 'orientation'},
        {'data': 'depth'}
      ]
    }
    
    // send a post request to robo_thoughts backend containing the above json object
    var response = fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => {
        // set state
        console.log(json)
        setOrientation(json.data[1])
        setDepth(json.data[2].depth * -1 + Math.random())
        batteries.map(i => {
          let rand = Math.random() * 100
          i.charge = rand
          i.icon = getBatteryIcon(i.charge)
        })
        
      })    
  }

  // returns the correct material ui battery icon to match the charge parameter
  const getBatteryIcon = (charge) => {
    if(charge !== null) {
          // find the battery icon that matches closest to the current charge
          const closest = [100, 80, 50, 20].reduce((a, b) => {
            return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
          })
    
          const key = chargeIcons.findIndex(  elem => elem.percent === closest )
          return chargeIcons[key].icon
        } else {
          return chargeIcons[4].icon
        }
  }

  const classes = useStyles();

  return (    
    <div className="App">
      <header className="App-header">
        <AppBar position="fixed">
          <Toolbar color='primary'>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon color='secondary'/>
           </IconButton>
           <Typography variant="h6"> robo_thoughts </Typography>
          </Toolbar>
        </AppBar>      
        <Box className={classes.videoPlayer} >  
          <VideoPlayer src={videoUrl}/>   
        </Box>                   
        
        <Accordion defaultExpanded={true}>
          <AccordionSummary                       
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box flexDirection="column">
              <Typography className={classes.heading}>PUDDLES</Typography>
              <Box
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
              >
                 <Avatar alt="OSU-UWRT" src="../public/favicon.ico"/>
              <Typography>OSU Underwater Robotics Team</Typography>
              </Box>
            </Box>
            <Batteries batteryArray={batteries} className={classes.batteries}/>
                         
          </AccordionSummary>   
          <Divider/>       
          <AccordionDetails className={classes.root}>
            <Imu depth={depth} orientation={orientation}/> 
            <Depth depth={depth} /> 
          </AccordionDetails>
        </Accordion>       
      </header>          
    </div>
  )
}

export default App