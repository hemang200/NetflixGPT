import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies)
   
    //{  "?" is used for optional chaining if the data is present then will get or error}
    if(!movies)
        return;//early return gives error when not use because store is initially null
    const mainMovie=movies[4];
    //console.log(mainMovie)

    const { original_title, overview ,id} = mainMovie;
    

  return (
    <div className='pt-[30%] bg-black md:pt-0'>
       <VideoTitle title={original_title} overview={overview}/>
       <VideoBackground movieId={id}/>


    </div>
  )
}

export default MainContainer