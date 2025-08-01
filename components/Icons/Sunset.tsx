import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const Sunset = ({ size = 24 }: any) => {
  return (
    <Svg fill='#FFFFFF' width={size} height={size} viewBox='0 0 32 32'>
      <G id='SVGRepo_bgCarrier' stroke-width='0'></G>
      <G
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></G>
      <G id='SVGRepo_iconCarrier'>
        <G>
          <Path d='M16,7c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v3C15,6.6,15.4,7,16,7z'></Path>
          <Path d='M8.2,9.6c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.5,6.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L8.2,9.6 z'></Path>
          <Path d='M3,17h3c0.6,0,1-0.4,1-1s-0.4-1-1-1H3c-0.6,0-1,0.4-1,1S2.4,17,3,17z'></Path>
          <Path d='M25,16c0,0.6,0.4,1,1,1h3c0.6,0,1-0.4,1-1s-0.4-1-1-1h-3C25.4,15,25,15.4,25,16z'></Path>
          <Path d='M23.1,9.9c0.3,0,0.5-0.1,0.7-0.3l2.1-2.1c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-2.1,2.1c-0.4,0.4-0.4,1,0,1.4 C22.6,9.8,22.8,9.9,23.1,9.9z'></Path>
          <Path d='M8.8,19.4C8.9,19.8,9.3,20,9.7,20h12.6c0.4,0,0.7-0.2,0.9-0.6c0.5-1.1,0.8-2.2,0.8-3.4c0-4.4-3.6-8-8-8s-8,3.6-8,8 C8,17.2,8.3,18.3,8.8,19.4z'></Path>
          <Path d='M29,22H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h26c0.6,0,1-0.4,1-1S29.6,22,29,22z'></Path>
          <Path d='M19,26H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h12c0.6,0,1-0.4,1-1S19.6,26,19,26z'></Path>
          <Path d='M25,26h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1-0.4,1-1S25.6,26,25,26z'></Path>
        </G>
      </G>
    </Svg>
  )
}

export default Sunset
