import React, {useState, useEffect} from 'react';
import {BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20} from '@material-ui/icons';
import {Typography, Box} from '@material-ui/core'

const Battery = ({charge, showPercent}) => {

  const [icon, setIcon] = useState(<BatteryUnknown fontSize="large" color='error'/>) 

  const chargeIcons = [
    {key: 0, percent: 100, icon: <BatteryFull fontSize="large" color='secondary'/>},
    {key: 1, percent: 80, icon: <Battery80 fontSize="large" color='secondary'/>},
    {key: 2, percent: 50, icon: <Battery50  fontSize="large"color='secondary'/>},
    {key: 3, percent: 20, icon: <Battery20 fontSize="large" color='error'/>}    
  ]

  // set the battery icon to match the passed in charge number
  useEffect(()=> {
  //   var correct
  //   if(charge !== null) {
  //     // find the battery icon with that matches the charge
  //     var closest = [100, 80, 50, 20].reduce((a, b) => {
  //       return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
  //     })

  //     // set the battery icon to match the charge
  //   chargeIcons.map(i => {
  //     if (closest === i.percent) {
  //       correct = i.icon
  //     }
  //   })
  //   setIcon(correct)
  // }
  })

  return (
    <Box diplay='flex' flexDirection='column' flexGrow='1' justifyContent='space-around'>
      {icon}
      <Box display='flex' justifyContent='center'>
      <Typography align='right' variant='caption'>
        {
          /* ternary conditional operator to control if percent is 
          shown and display special text when charge is null */
           showPercent ? `${charge !== null ? charge : '—'}%` : ''
        }
      </Typography>
      </Box>    
    </Box>
  )
}

export default Battery 