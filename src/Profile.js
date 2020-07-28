import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Card, Box, Typography, Avatar, Button, Paper, Fade, Popper, Link } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import WebIcon from '@material-ui/icons/Web';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap', 
    textAlign: 'center'   
  },
  teamInfo: {
    display: 'flex',
    flexDirection: 'row',    
    margin: 'auto 0'
  },
  teamName: {
   margin: 'auto',
   textAlign: 'left',
   paddingLeft: '7px'
  },
  robot: {
    // width: '100%',
    display: 'flex'    
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  infoIcon: {
    paddingLeft: '7px',
  }  
}))

// receive both 'state depth' and 'controls depth'
const Profile = ({info}) => {

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const profileRef = useRef()
  const popperRef = useRef()
  const classes = useStyles()  

  // useEffect(() => {
  //   // add when mounted
  //   document.addEventListener("mousedown", handleClick);
  //   // return function to be called when unmounted
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  const handleClick = (event) => {         
      setOpen(open ? false : true)
  }

  return (    
    <Box className={classes.root}>
      <Box className={classes.robot}>        
        <Typography variant="h4">{info.robot.name}</Typography>
        {/* <InfoIcon
          className={classes.infoIcon}
          fontSize="small"
          aria-label="Acknowledge"
          onClick={handleClickOpen}        
        /> */}
      </Box>
        {/* <Dialog aria-labelledby="simple-dialog-title" onClose={handleClose} open={open}>
          <DialogTitle>{info.robot.name}</DialogTitle>
          <Card>
            <Typography>{info.robot.info}</Typography>
          </Card>
        </Dialog> */}
        <Box
          aria-label="Acknowledge"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        >
        <Button ref={profileRef} className={classes.teamInfo} onClick={handleClick}>         
          <Avatar className={classes.small} alt={info.name} src={info.avatarSrc} />
          <Typography variant="caption" className={classes.teamName}>{info.name}</Typography>
        </Button> 
        <Popper ref={popperRef} open={open} placement="bottom-start" anchorEl={profileRef.current} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
            <List component="nav" aria-label="main mailbox folders">
            <Link href="https://github.com/osu-uwrt/">
              <ListItem button>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText primary="Github" />
              </ListItem>
              </Link>
              <Link href="https://www.instagram.com/osu_uwrt/">
              <ListItem button>
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary="Instagram" />
              </ListItem> 
              </Link>
              <Link href="https://uwrt.engineering.osu.edu/">
              <ListItem button>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                
                  <ListItemText primary="Website" />                             
              </ListItem> 
              </Link>       
            </List> 
            </Paper>                                   
          </Fade>
        )}
      </Popper>
      </Box>
    </Box>
  )
}

export default Profile 