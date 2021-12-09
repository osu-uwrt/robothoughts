import React, { useState, useEffect } from 'react'
import { BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20 } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography, Box, Card, Divider, FormGroup, Switch } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'                                                                                                                                                                                                                                                                                                                                                                                                                                          
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import fetch from 'node-fetch'
import Batteries from './Batteries'
import Data from './Data'
import Profile from './Profile'
import VideoPlayer from './VideoPlayer'
import useStore from './store'
import ModelViewer from './ModelViewer'
import renderModelViewer from "./renderModelViewer"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    margin: 'auto',    
  },
  toolbar: theme.mixins.toolbar,
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
  videoPlayer: {    
    width: '100%',
    display: 'flex',    
    // backgroundColor: 'purple',
  },
  robotHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center'
  }
}))

const chargeIcons = [
  {key: 0, percent: 100, icon: <BatteryFull fontSize='large'color='secondary' />},
  {key: 1, percent: 80, icon: <Battery80 fontSize='large' color='secondary' />},
  {key: 2, percent: 50, icon: <Battery50  fontSize='large' color='secondary' />},
  {key: 3, percent: 20, icon: <Battery20 fontSize='large' color='error' />},
  {key: 4, percent: null, icon: <BatteryUnknown fontSize='large' color='error' />}    
]
const url = 'http://robothoughts-server.local:5000'
const isActive = true
var modelViewerRendered = false;

const App = () => {
  //stop a broken screen from popping up when the api is down
  const [apiResponding, setApiResponding] = useState(true); // IMPORTANT --- Change default to false before production build
  const [isMetric, setMetric] = useState(true);
  const [depth, setDepth] = useState(0)
  const [orientation, setOrientation] = useState({x: 0, y: 0, z: 0})  
  const [position, setPosition] = useState({x: 0, y: 0, z: 0})
  const [videoUrl, setVideoUrl] = useState('http://0.0.0.0:8081/hls/stream.m3u8');
  const [batteries] = useState([
    {name: 'battery1', icon: chargeIcons[4].icon},
    {name: 'battery2', icon: chargeIcons[4].icon},
    {name: 'battery3', icon: chargeIcons[4].icon},
    {name: 'battery4', icon: chargeIcons[4].icon},
  ])
  const [team] = useState({
    name: 'OSU Underwater Robotics Team',
    avatarSrc:'/logo.jpg',
    robot: {
      name: 'Tempest', 
      info: 'Tempest is the team\'s newest autonomous underwater vehicle. It made its debut at RoboSub 2019. It is the successor to Maelstrom.'
    },
    github: 'https://github.com/osu-uwrt',
    instagram: 'https://www.instagram.com/osu_uwrt/?hl=en',
    website: 'https://org.osu.edu/osu-uwrt'  
  })
  const actions = useStore(state => state.actions)

  useEffect(() => {
    if (isActive) {
      fetch(`${url}/video_feed`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        }}).then(response => response.json()).then(json => {
          console.log("The request says:" + json.data[0].url);
          setVideoUrl(json.data[0].url);
      }).catch(error => {
        console.log(error)
      });

      console.log("The video url is:" + videoUrl);
      
      const interval = setInterval(() => {
        requestData()
      }, 100)
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
    };
    
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

        setApiResponding(true)

        // set state
        // console.log(json)
        actions.updatePosition(json.data[0].position) 
        actions.updateOrientation(json.data[1].orientation)       
        setPosition(json.data[0].position)
        console.log(json.data[1]);
        setOrientation(json.data[1])
        setDepth(json.data[2].depth * -1) 
        batteries.map(i => {
          let rand = Math.random() * 0
          i.charge = rand
          i.icon = getBatteryIcon(i.charge)
        })        
      }).catch(error => {
          //setApiResponding(false)// IMPORTANT --- uncomment before production build
          console.log(error)
      });
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

  const toggleMetric = () => {
    setMetric((prev) => !prev)
  }

  const toggleMenu = () =>{
  }

  const classes = useStyles();

  //for puddles viewer
  const [x_modelRotation, setx_modelRotation] = useState(0)
  const [y_modelRotation, sety_modelRotation] = useState(0)
  const [z_modelRotation, setz_modelRotation] = useState(0)

  const setXmodelRotation = (radians) => {
    setx_modelRotation(radians);
  }

  const setYmodelRotation = (radians) => {
    sety_modelRotation(radians);
  }

  const setZmodelRotation = (radians) => {
    setz_modelRotation(radians);
  }

  setTimeout(renderModelViewer, 5000);

  return (    
    <div className="App">
      <header className="App-header">
        <AppBar position="fixed">
          <Toolbar color='primary'>
          <IconButton onClick={toggleMenu} edge="start" aria-label="menu">
            <MenuIcon color='secondary'/>
           </IconButton>
           <Typography variant="h6">Robo Thoughts</Typography>
          </Toolbar>
        </AppBar>  
        {apiResponding ? 
          <Box className={classes.root}>
          <Box className={classes.toolbar}></Box>
          <VideoPlayer className={classes.videoPlayer} src={videoUrl}/>
            <Accordion defaultExpanded={true}>
              <AccordionSummary                       
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"            
              >
              <Box className={classes.robotHeader}>
                <Profile info={team} />
                <Batteries batteryArray={batteries} />    
              </Box>                     
              </AccordionSummary>   
              <Divider/>       
              <AccordionDetails id="DataViewerAccordian" className={classes.root}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={isMetric} onChange={toggleMetric} />}
                    label="Metric"
                    labelPlacement="start"
                  />
                </FormGroup>
                <ModelViewer parentID="DataViewerAccordian" x_rotation={orientation.x} y_rotation={orientation.y} z_rotation={orientation.z}></ModelViewer>
                <Data isMetric={isMetric} depth={depth} position={position}/> 
              </AccordionDetails>
            </Accordion>
          </Box>
          :
          <div>
            <br/>
            <br/>
            <br/>
            <h1 style={{textAlign: "Center"}}> There is no active API Connection! </h1>
          </div>
        }    
      </header>          
    </div>
  )
}

export default App