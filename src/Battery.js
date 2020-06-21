import React, {useState, useEffect} from 'react';
import {BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20} from '@material-ui/icons';

const Battery = ({charge}) => {

  const [icon, setIcon] = useState(<BatteryUnknown fontSize="large" color='error'/>) 

  const chargeIcons = [
    {percent: 100, icon: <BatteryFull fontSize="large" color='secondary'/>},
    {percent: 80, icon: <Battery80 fontSize="large" color='secondary'/>},
    {percent: 50, icon: <Battery50  fontSize="large"color='secondary'/>},
    {percent: 20, icon: <Battery20 fontSize="large" color='error'/>}    
  ]

  // set the battery icon to match the passed in charge number
  useEffect(()=> {
    var correct
    if(charge != null) {
      // find the battery icon with that matches the charge
      var closest = [100, 80, 50, 20].reduce((a, b) => {
        return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
      })

      // set the battery icon to match the charge
    chargeIcons.map(i => {
      if (closest === i.percent) {
        correct = i.icon
      }
    })
    setIcon(correct)
  }
  })

  return (
    <div>
      {icon}
      {/* ternary conditional operator to display special text when charge is null */}
      {`${charge != null ? charge : '--'}%`}    
    </div>
  )
}

export default Battery 