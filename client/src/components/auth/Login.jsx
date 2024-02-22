import React, { useState } from "react";
import "../../styles/Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("")

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3000/auth/login', 
    {email,password})
    .then((res)=>{
      console.log(res)
      if(res.data.status){
        navigate('/home')
      }else{
        setError(res.data.message);
      }
      
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Link to='/forgotPassword'>Forgot password?</Link>
        <p>Don't have an account?</p>
        <Link to="/signup"><button>Sign up</button></Link>
      </form>
    </div>
  );
}
