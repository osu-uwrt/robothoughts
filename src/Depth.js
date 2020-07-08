import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography } from '@material-ui/core'
// import { letterFrequency } from '@vx/mock-data'
import Graph from './Graph'

// receive both 'state depth' and 'controls depth'
const Depth = ({depth}) => {

  return (
    <div>
      <Box display='flex'>
      <Card className='test'>
      <Typography variant='h3'>
        Depth
      </Typography>
      {`${depth
        // .toFixed(2)
        } meters `}
      {/* <Graph width={200} height={100} /> */}
      </Card>
      </Box>
    </div>
  )
}

export default Depth 