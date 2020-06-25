import React, { useState } from 'react';
import { Tabs, Tab, Card, Box, Typography } from '@material-ui/core'
// import { letterFrequency } from '@vx/mock-data'
import Graph from './Graph'

// receive both 'state depth' and 'controls depth'
const Depth = ({stateDepth, controlsDepth}) => {
  // default to the first tab (which will be 'state depth')
  const [depthType, setDepthType] = useState(0)

  // event handler to control which version of depth is displayed
  const handleDepthChange = (event, newValue) => {    
      setDepthType(newValue)
    }

  return (
    <div>
      <Box display='flex'>
      <Card className='test'>
      <Tabs
        value={depthType}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleDepthChange}
        aria-label="disabled tabs example"
      >
        <Tab label="State Depth" />
        <Tab label="Controls Depth"/>
      </Tabs>
      <Typography variant='h3'>
        Depth
      </Typography>
      {/* ternary conditional operator to display depth from the selected source */}
      {`${ depthType === 0 ? stateDepth.toFixed(2) : controlsDepth.toFixed(2)} meters `}
      <Graph width={200} height={100} />
      </Card>
      </Box>
    </div>
  )
}

export default Depth 