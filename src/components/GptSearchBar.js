import React, { useRef } from "react";
import lang from "../Utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../Utils/openai";
import { API_OPTIONS } from "../Utils/constants";
import { addGPtMovieResult } from "../Utils/gptSlice";
import run from "../Utils/geminiai";

const GptSearchBar = () => {
    const dispatch=useDispatch()
    const langkey=useSelector(store=>store.config.lang)
    const searchText=useRef(null)
    //search in tmdb api

    const searchMovieTMDB=async (movie)=>{
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS)
        const json =await data.json()
        return json.results;
    }
    const handleGptSearchClick=async ()=>{
       
        const gptQuery="Act as a movie Recommendation system and suggest some movies for the query"+searchText.current.value+". only gives me names of 5 movies , comma seperated like the example result given ahead. example result: gadar,sholay,golmaal,koi mil gaya"
        const gptMoviesResult=await run(gptQuery)
       
        //make a api call to openai to get the results;
        // const gptQuery="Act as a movie Recommendation system and suggest some movies for the query"+searchText.current.value+". only gives me names of 5 movies , comma seperated like the example result given ahead. example result: gadar,sholay,golmaal,koi mil gaya"
        // const chatCompletion = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQuery }],
        //     model: 'gpt-3.5-turbo',
        //   });
          //gives warning open ai is call from frontend but it should be done from backend
        //   if(!chatCompletion){
        //    return <h1>no response</h1>
        //   }
          const gptMovies=gptMoviesResult.split(",")
          
          //const gptMovies=["Andaz Apna Apna","Hera Pheri","Chupke Chupke"]
          const data=gptMovies.map((movie)=>searchMovieTMDB(movie))
          //[promise,promise,promise,promise] returns an promise array

          const tmdbResults=await Promise.all(data)
         
          dispatch(addGPtMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))


    }
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langkey].GptSearchPlaceholder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
