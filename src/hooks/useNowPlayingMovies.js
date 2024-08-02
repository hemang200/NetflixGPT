import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addNowPlayingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies=()=>{
    const disptach=useDispatch()
    const nowPlayingMovies=useSelector((store)=>store.movies.nowPlayingMovies)
    const getNowPlayingMovies=async ()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
      const json=await data.json();
      disptach(addNowPlayingMovies(json.results))
      //console.log(json.results)
    }
    useEffect(()=>{
      !nowPlayingMovies && getNowPlayingMovies()
    },[])
}
export default useNowPlayingMovies;