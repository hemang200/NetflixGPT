import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../Utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
        <img className='h-screen object-cover md:w-screen'
          src={BG_URL}
          alt="background-image"
        />
        </div>
    <div className=' md:p-0'>
        
        {/* // gpt search bar and movie suggestions */}
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch