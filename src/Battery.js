import React from 'react'
//import React, {useState, useEffect} from 'react';
import {Typography, Box} from '@material-ui/core'

const Battery = ({charge, showPercent, icon}) => {

  // const [icon, setIcon] = useState(<BatteryUnknown fontSize='large' color='error'/>) 

  

  // // set the battery icon to match the passed in charge number
  // useEffect(()=> {
  //   if(charge !== null) {
  //     // find the battery icon that matches closest to the current charge
  //     const closest = [100, 80, 50, 20].reduce((a, b) => {
  //       return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
  //     })

  //     const key = chargeIcons.findIndex(  elem => elem.percent === closest )
  //     setIcon( chargeIcons[key].icon )
  //   } else {
  //     console.info( 'charge - ', charge)
  //   }
    
  // }, [charge, chargeIcons])

  
  let content = (
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

  return content
}

export default Battery 