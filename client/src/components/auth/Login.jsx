import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../../assets/LogoWhite.png";
import { MdErrorOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("")
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit=(e)=>{
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError("Please enter the email address");
    return;

  } else if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (!password) {
    setError("Please enter your password");
    return;
  }

    axios.post('https://e-biz-card-frontend.vercel.app/auth/login', 
    {email,password})
    .then((res)=>{
      console.log(res)
      if(res.data.status){
        setSuccessMessage("Login successful!");

        setTimeout(() => {
          navigate('/dashboard');
      }, 1000);
        
      }else{
        setError(res.data.message);
      }
      
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (

<div className="hero gradientBg">
  <div className='md:px-6 px-4 max-w-screen-2xl mx-auto'>
    <div className="flex justify-center items-center py-10">
        <div className="flex items-center space-x-4">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center justify-center space-x-3 text-primary"
            >
              <img
                src={Logo}
                alt="logo"
                className="w-10 inline-block items-center"
              />
              <span className="text-white">QUIKCARD</span>
            </a>
        </div>
    </div>
    
    
    <div className="flex items-center justify-center h-[100vh] mt-[-100px] hero__title ">
      <form className="w-full max-w-[400px] h-auto border-2 rounded-2xl borderShadow p-10 flex items-center justify-center flex-col shadow-2xl  bg-white" onSubmit={handleSubmit}>
         
          <div className="text-center pb-5">
            <h2 className="text-2xl text-primary font-semibold">Login</h2>
          </div>

        <div className="flex flex-col space-y-8">

          <div className="group flex flex-row gap-2 items-center justify-between w-72 border border-2 border-gray-100 borderShadow rounded-full p-2 shadow-lg">
            
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent placeholder-black-100 border-none focus:outline-none w-60 pl-2"
            />

            <MdEmail className="text-white w-10 h-7"/>
          </div>

          <div className="group flex flex-row gap-2 items-center justify-between w-72 border-2 border-gray-100 borderShadow rounded-full p-2 shadow-lg">
           
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent placeholder-black-100 border-none focus:outline-none w-60 pl-2"
            />

             <RiLockPasswordFill className="text-white w-10 h-7" />
          </div>
    
          <button type="submit" className="w-72  borderShadow rounded-full p-2.5 shadow-lg group border-2 border-gray-100 bg-primary text-white">Login</button>

        </div>
              {error && 
              <div className="pt-3 flex flex-row gap-2 items-center justify-center">
                <MdErrorOutline className="w-7 h-7 text-red-700"/>
                <p className=" text-red-700 text-lg">{error}</p>
              </div>}

              {successMessage && 
              <div className="pt-3 flex flex-row gap-2 items-center justify-center">
                <TiTick className="w-7 h-7 text-green-700"/>
                <p className=" text-green-700 text-lg">{successMessage}</p>
              </div>}

        <Link to='/forgotPassword'><p className="pt-5 text-primary text-md font-semibold">Forgot password?</p></Link>
        <p className="pt-5">Don't have an account? <Link to="/signup" className="text-red-700">Sign up</Link></p>
        
      </form>
    </div>

    <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>

        <div className="cube"></div>
        <div className="cube"></div>
    </div>
</div>
   
  );
}
