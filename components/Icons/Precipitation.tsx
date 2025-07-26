import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const Precipitation = ({ size = 24 }: any) => {
  return (
    <Svg
      fill='#000000'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      id='rain-alt'
      data-name='Flat Color'
    >
      <G id='SVGRepo_bgCarrier' stroke-width='0'></G>
      <G
        id='SVGRepo_tracerCarrier'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></G>
      <G id='SVGRepo_iconCarrier'>
        <Path
          id='secondary'
          d='M16,22a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l2-4a1,1,0,1,1,1.78.9l-2,4A1,1,0,0,1,16,22ZM8,22a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l2-4a1,1,0,1,1,1.78.9l-2,4A1,1,0,0,1,8,22Zm5-2a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l1-2a1,1,0,1,1,1.78.9l-1,2A1,1,0,0,1,13,20ZM5,20a.93.93,0,0,1-.45-.11,1,1,0,0,1-.44-1.34l1-2a1,1,0,0,1,1.78.9l-1,2A1,1,0,0,1,5,20Z'
        ></Path>
        <Path
          id='primary'
          d='M17,4a4.36,4.36,0,0,0-.51,0A6,6,0,0,0,12,2,6,6,0,0,0,6.35,6,4,4,0,1,0,6,14H17A5,5,0,0,0,17,4Z'
        ></Path>
      </G>
    </Svg>
  )
}

export default Precipitation
