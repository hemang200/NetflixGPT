import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import movieSlice, { addTrendingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useTrendingMovies=()=>{
    const disptach=useDispatch()
    const trendingMovies=useSelector(store=>store.movies.trendingMovies)
    const getTrendingMovies=async ()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
      const json=await data.json();
      disptach(addTrendingMovies(json.results))
      //(json.results)
    }
    useEffect(()=>{
      !trendingMovies && getTrendingMovies()
    },[])
}
export default useTrendingMovies;