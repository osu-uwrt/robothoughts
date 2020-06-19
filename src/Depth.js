import React, { useState } from 'react';
import { Tabs, Tab, Card} from '@material-ui/core'

// receive both 'state depth' and 'controls depth'
const Depth = ({stateDepth, controlsDepth}) => {
  // default to the first tab (which will be 'state depth')
  const [depthType, setDepthType] = useState(0);

  // event handler to control which version of depth is displayed
  const handleDepthChange = (event, newValue) => {    
      setDepthType(newValue);
    };

  return (
    <div>
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
    </div>
  )
}

export default Depth 