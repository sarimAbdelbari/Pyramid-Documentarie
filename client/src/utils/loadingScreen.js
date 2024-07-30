import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const LoadingScreen = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-[#000000bd]'>
        <MutatingDots 
        height="125"
        width="125"
        color="#0e67aa"
        secondaryColor="#e40c24"
        radius="14"
        />

    </div>
  )
}

export default LoadingScreen