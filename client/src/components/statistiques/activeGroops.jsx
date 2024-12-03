import React from 'react'
import { LuSearch } from "react-icons/lu";
import { LuRefreshCcw } from "react-icons/lu";

const ActiveGroops = () => {
  return (
    <div className="m-5 shadow-2xl bg-lightCyen dark:shadow-white rounded-lg dark:bg-mainDarkBg flex justify-around items-center flex-wrap gap-4 p-5 ">
      <div className='flex gap-3 items-center justify-between'>
          <div className='flex gap-3 items-center p-3 bg-lightCyen shadow-xl'>
          <LuRefreshCcw />
            <p className='text-textSecLightColor text-lg'>Refresh</p>
          </div>
        <div className='flex gap-3 items-center'>
        <h3 className='text-2xl text-textLightColor'>Active Groops</h3>
        <p className='text-textSecLightColor text-lg'>Details of groops there users and There routs number</p>
          </div>
          <div className='flex gap-3 items-center'>
          <LuSearch />
            <input 
            type='search' 
            name='search' 
            placeholder='search For active groops' 
            className='p-2 rounded-md bg-white dark:bg-mainDarkBg text-textLightColor dark:text-textSecLightColor shadow-xl'
             />
          </div>
      </div>
      <div className='bg-lightCyen shadow-xl flex flex-col gap-3'>
      </div>
    </div>
  )
}

export default ActiveGroops