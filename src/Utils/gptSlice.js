import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        movieNames:null,
        movieResults:null
    },
    reducers:{
        toggleGptSearchView:(state,action)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addGPtMovieResult:(state,action)=>{
            const {movieNames,movieResults}=action.payload;
            state.movieNames=movieNames;
            state.movieResults=movieResults;
        },
        removeGPtMovieResult:(state,action)=>{
            state.movieNames=null;
            state.movieResults=null;
        }
    }
})
export const {toggleGptSearchView,addGPtMovieResult, removeGPtMovieResult}=gptSlice.actions;
export default gptSlice.reducer;