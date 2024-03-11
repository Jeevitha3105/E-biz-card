import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/LogoWhite.png";
import { MdErrorOutline } from "react-icons/md";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!email){
      setError("Please enter the email address")
      return;
    }

    axios
      .post("https://e-biz-card-phi.vercel.app/auth/forgotPassword", { email })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
            alert("Check your email for reset password link")
          navigate("/login");
        } else{
          setError(res.data.message);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (


    <div className="hero gradientBg ">
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

        <div className="flex items-center justify-center h-[100vh] mt-[-100px]">
          <form className="w-full max-w-[400px] h-auto border-2 rounded-2xl borderShadow p-10 flex items-center justify-center flex-col shadow-2xl bg-white" onSubmit={handleSubmit}>
            
            <div className="text-center pb-5">
              <h2 className="text-2xl text-primary font-semibold">Forgot Password</h2>
            </div>

            <div className="flex flex-col space-y-8">
              <div className="group flex flex-row gap-2 items-center justify-between w-72 border-2 border-gray-100 borderShadow rounded-full p-2 shadow-lg">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent placeholder-black-100 border-none focus:outline-none w-60 pl-2"
                />
                <MdEmail className="text-white w-10 h-7"/>
              </div>

              {error && 
                    <div className="pt-3 flex flex-row gap-2 items-center justify-center">
                      <MdErrorOutline className="w-7 h-7 text-red-700"/>
                      <p className=" text-red-700 text-lg">{error}</p>
                    </div>}

              <button type="submit" className="w-72 border-2 border-gray-100 borderShadow rounded-full p-2.5 shadow-lg group bg-primary text-white">Send</button>
              
          </div>
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

