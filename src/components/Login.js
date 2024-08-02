import React, { useRef, useState } from "react";
import Header from "./Header";
import {checkValidate} from "../Utils/Validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../Utils/firebase"

import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_URL, USER_AVATAR } from "../Utils/constants";
const Login = () => {
  
  const dispatch=useDispatch()
  const [isSignInForm, setIsSignForm] = useState(true);
 const[errorMessage,setErrorMessage]=useState(null);
  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  };
  const name=useRef(null);
  const email=useRef(null)
  const password=useRef(null)
  const handleButtonClick=()=>{
    //console.log(email.current.value,password.current.value)
    const message=checkValidate(email.current.value,password.current.value)
    //console.log(message)
    setErrorMessage(message)
    if(message) return;

    //Sign in Sign up logic

    if(!isSignInForm){
      //Sign up Logic
     
createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_AVATAR
    }).then(() => {
      // Profile updated!
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
   
      // ...
    }).catch((error) => {
      setErrorMessage(error.message)
      // An error occurred
      // ...
    });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" . "+errorMessage)
    // ..
  });

      
    }
    else{
      //Sign in logic
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" . "+errorMessage)
  });
    }
    
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="h-screen object-cover md:w-screen"
          src={BG_URL}
          alt="background-image"
        />
      </div>
      <form onSubmit={(e)=>{e.preventDefault()}} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input
         ref={name}
          className="p-4 my-4 w-full bg-gray-700"
          type="text"
          placeholder="Full Name"
        />}
        <input
        ref={email}
          className="p-4 my-4 w-full bg-gray-700"
          type="text"
          placeholder="Email Address"
        />
         
        <input
        ref={password}
          className="p-4 my-4 w-full bg-gray-700"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button onClick={handleButtonClick} className="p-4 my-6 w-full bg-red-700 rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
        {isSignInForm
          ? "New to Netflix? Sign Up Now"
          : " Already registered? Sign In Now"}
      </p>
      </form>
      
    </div>
  );
};

export default Login;
