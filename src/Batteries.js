import React from 'react';
// import { Tabs, Tab, Card, Box } from '@material-ui/core'
import Battery from './Battery'

// receive a map[String, number] where key: 'battery name', value: 'charge'
const Batteries = ({batteryArray}) => {

  return (
    <div className='batteryContainer'>
        {batteryArray.map(i => {return <Battery charge={i.charge} />})}
    </div>
  )
}

export default Batteries