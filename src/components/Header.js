import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../Utils/constants';
import { toggleGptSearchView } from '../Utils/gptSlice';
import {changeLanguage} from "../Utils/configSlice";
import { removeGPtMovieResult } from '../Utils/gptSlice';
const Header = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const user=useSelector(store=>store.user)
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut = () => {
   signOut(auth)
   .then(()=>{
    navigate("/")
   })
   .catch((error)=>{
    navigate("/error")
   })
  };
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed 
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
    return ()=>unsubscribe()
  },[])
  const handleGptSearchClick=()=>{
    //Toggle GPTSearch
    dispatch(toggleGptSearchView())
    if(showGptSearch){
      dispatch(removeGPtMovieResult())
    }
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
   
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img className='w-44 mx-auto md:mx-0' src={LOGO}
        alt="netflix logo"/>
       {user && <div className='flex p-2 justify-between'>
        {showGptSearch &&<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick={handleGptSearchClick} className='py-2 px-4 mx-4 my-2 rounded-lg bg-purple-700 text-white'>{showGptSearch ? "HomePage":"Gpt Search"}</button>
        <div className='flex'>
        <img
            className="w-12 h-12"
            alt="usericon"
            src={user.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
          </div>
        </div>}
    </div>
    
  )
}

export default Header