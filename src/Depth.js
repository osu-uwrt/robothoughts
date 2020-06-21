import React, { useState } from 'react';
import { Tabs, Tab, Card, Box } from '@material-ui/core'

// receive both 'state depth' and 'controls depth'
const Depth = ({stateDepth, controlsDepth}) => {
  // default to the first tab (which will be 'state depth')
  const [depthType, setDepthType] = useState(0)

  // event handler to control which version of depth is displayed
  const handleDepthChange = (event, newValue) => {    
      setDepthType(newValue);
    };

  return (
    <div>
      <Box maxWidth='600px'>
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
      {/* ternary conditional operator to display depth from the selected source */}
      {`${ depthType === 0 ? stateDepth : controlsDepth} meters `}
      </Card>
      </Box>
    </div>
  )
}

export default Depth 