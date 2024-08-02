import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addPopularMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies=()=>{
    const disptach=useDispatch()
    const popularMovies=useSelector((store)=>store.movies.popularMovies)
    const getPopularMovies=async ()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)
      const json=await data.json();
      disptach(addPopularMovies(json.results))
      //console.log(json.results)
    }
    useEffect(()=>{
      !popularMovies && getPopularMovies()
    },[])
}
export default usePopularMovies;