import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core'



// takes in a key value pair array map = [{'depth type', depth},...]
const Depth = ({stateDepth, controlsDepth}) => {
  const [depthType, setDepthType] = useState(0);

  const handleDepthChange = (event, newValue) => {    
      setDepthType(newValue);
      console.log(depthType)
    };
  // set the battery icon to match the passed in charge number

  return (
    <div>
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
    </div>
  )
}

export default Depth 