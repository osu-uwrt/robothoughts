import React, { useState } from 'react';
import { Card, Box, Switch, FormControlLabel } from '@material-ui/core'
import Battery from './Battery'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
 root: {
  //  alignSelf: 'flex-end'
 }
}))

// receive a map[String, number] where key: 'battery name', value: 'charge'
const Batteries = ({batteryArray}) => {
  let count = 0
  const [showPercent, setShowPercent] = useState(true)
  
  const handleChange = (event) => {
    setShowPercent(event.target.checked)
  }

  const classes = useStyles();

  return (
    <Box className={classes.root}>     
        <Box display='flex' flexDirection='row'>
        {batteryArray.map(i => {
        return <Battery           
            charge={i.charge} 
            showPercent={showPercent}
            icon={i.icon}
            key={count++} 
          />
        })}
        </Box>
        {/* <FormControlLabel
        control={
          <Switch
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            checked={showPercent}
            onChange={handleChange}
            name="percentSwitch"
          />
        }
        label="Show percent"
      />     */}
    </Box>
  )
}

export default Batteries