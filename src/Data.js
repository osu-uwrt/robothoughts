import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography } from '@material-ui/core'
// import { letterFrequency } from '@vx/mock-data'
import Graph from './Graph'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',    
    display: 'flex',  
    flexWrap: 'wrap',   
    flexDirection: 'row',       
  },
  first: {  
    width: '100%',    
    display: 'flex',  
    flexWrap: 'nowrap',   
    flexDirection: 'row', 
    justifyContent: 'space-between'     
  },
  component: {    
    display: 'inline',    
  },
}))
// receive both 'state depth' and 'controls depth'
const Data = ({isMetric, depth, position}) => {
  const classes = useStyles()
  const toFeet = 3.2808

  // takes a number (in meters) and reduces to 2 decimal places in the correct system of measurement
  const getNumber = (n) => {
    let ans = n * (isMetric ? 1 : toFeet)
    return ans.toFixed(2)
  }

  return (    
      <Box className={classes.container}> 
        <Box className={classes.first}> 
          <Typography variant="subtitle1" className={classes.component}>  
            <b>x:</b>{` ${getNumber(position.x)} ${isMetric ? 'm' : 'ft'}`}
          </Typography>
          <Typography variant="subtitle1" className={classes.component}>                
            <b>y:</b>{` ${getNumber(position.y)} ${isMetric ? 'm' : 'ft'}`}
          </Typography>
          <Typography variant="subtitle1" className={classes.component}>                
            <b>z:</b>{` ${getNumber(position.z)} ${isMetric ? 'm' : 'ft'}`}
          </Typography>
        </Box>
      <Typography variant="subtitle1" >          
        <b>Depth:</b>{` ${getNumber(depth)} ${isMetric ? 'm' : 'ft'}`}      
      </Typography>
      </Box>           
  )
}

export default Data 