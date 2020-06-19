import React from 'react';
import {BatteryUnknown, BatteryFull, Battery80, Battery50, Battery20} from '@material-ui/icons';

const Battery = ({charge}) => {

  const charges = [
    {percent: 100, icon: <BatteryFull fontSize="large" color='secondary'/>},
    {percent: 80, icon: <Battery80 fontSize="large" color='secondary'/>},
    {percent: 50, icon: <Battery50  fontSize="large"color='secondary'/>},
    {percent: 20, icon: <Battery20 fontSize="large" color='error'/>}    
  ]

  // set the battery icon to match the passed in charge number
  const switchIcon = () => {
      var icon = null
    if(charge === null) {
      icon = <BatteryUnknown fontSize="large" color='error'/>
    } else {
      // find the battery icon with that matches the charge
      var closest = [100, 80, 50, 20].reduce((a, b) => {
        return Math.abs(b - charge) < Math.abs(a - charge) ? b : a;
      })

      // set the battery icon to match the charge
      charges.map((i) => {
        if (closest === i.percent) {
          icon = i.icon
        }
      })
    }
    return icon
  }

  return (
    <div>
      {switchIcon()}
      {/* ternary conditional operator to display special text when charge is null */}
      {`${charge != null ? charge : '--'}%`}    
    </div>
  )
}

export default Battery 