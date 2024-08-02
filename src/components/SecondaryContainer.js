import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies=useSelector(store=>store.movies)
   
    return (
        movies.nowPlayingMovies && (
    <div className='bg-black'>
        <div className='mt-0 md:-mt-52 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies.trendingMovies}/>
        <MovieList title={"Popular"} movies={movies.popularMovies}/>
        
        
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
        <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
{/* 
movielist-popular
    MovieCard * n
movielist-now playing
movielist-trending
movielist-horror
*/}
</div>
    </div>
        )
  )
}

export default SecondaryContainer