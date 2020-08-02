import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography } from '@material-ui/core'
// import { letterFrequency } from '@vx/mock-data'
import Graph from './Graph'

// receive both 'state depth' and 'controls depth'
const Depth = ({depth, position}) => {

  return (
    <div>
      <Box display='flex'>            
      {`depth: ${depth.toFixed(2)} meters `}
      {/* <Graph width={200} height={100} /> */}    
      {`x: ${position.x.toFixed(2)} y: ${position.y.toFixed(2)} z: ${position.z.toFixed(2)}`}
      </Box>      
    </div>
  )
}

export default Depth 