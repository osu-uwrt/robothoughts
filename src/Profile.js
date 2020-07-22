import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography, Avatar } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles();


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
        <Dialog aria-labelledby="simple-dialog-title" onClose={handleClose} open={open}>
          <DialogTitle>{info.robot.name}</DialogTitle>
          <Card>
            <Typography>{info.robot.info}</Typography>
          </Card>
        </Dialog>
        <Box className={classes.teamInfo}>
          <Avatar className={classes.small} alt={info.name} src={info.avatarSrc} />
          <Typography variant="caption" className={classes.teamName}>{info.name}</Typography>
        </Box>
    </Box>
  )
}

export default Profile 