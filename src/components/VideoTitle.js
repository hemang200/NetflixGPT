import React from 'react'
import { BsPlayFill } from "react-icons/bs";
const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video absolute pt-[20%] px-6 md:px-24  text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-2/4'>{overview}</p>
        <div className='flex gap-3 my-4 md:m-0'>
            <button className='flex  justify-center bg-gray-100 text-black p-1 md:p-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80'><BsPlayFill className="text-2xl"/> Play</button>
            <button className='hidden md:inline-block bg-gray-400 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle