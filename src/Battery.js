import React from 'react'
//import React, {useState, useEffect} from 'react';
import {Typography, Box} from '@material-ui/core'

const Battery = ({charge, showPercent, icon}) => {
  
  return (
    <Box diplay='flex' flexDirection='column' flexGrow='1' justifyContent='space-around'>
      {icon}
      <Box display='flex' justifyContent='center'>
      <Typography align='right' variant='caption'>
        {
          /* ternary conditional operator to control if percent is 
          shown and display special text when charge is null */
           showPercent ? `${charge !== ( null || undefined ) ? Math.ceil(charge) : '—'}%` : ''
        }
      </Typography>
      </Box>    
    </Box>
  )
}

export default Battery 