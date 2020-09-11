import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography } from '@material-ui/core'
// import { letterFrequency } from '@vx/mock-data'
import Graph from './Graph'

// receive both 'state depth' and 'controls depth'
const Data = ({isMetric, depth, position}) => {

  const toFeet = 3.2808

  const getNumber = (n) => {
    let ans = n * isMetric ? 1 : toFeet
    return ans.toFixed(2)
  }

  return (
    <div>
      <Box display='flex'>  
      <Typography>                
        {`x: ${getNumber(position.x)} y: ${getNumber(position.y)} z: ${getNumber(position.z)}`}
      </Typography>
      <Typography>          
        {`depth: ${getNumber(depth)}`}      
      </Typography>
      </Box>       
    </div>
  )
}

export default Data 