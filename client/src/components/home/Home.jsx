import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(res=>{
      if(res.data.status){
        navigate('/login')
      }
    }).catch((err)=>{
      console.log(err)
    })
  } 

  return (
    <>
    <div>Home
      <button><Link to='/dashboard'>Dashboard</Link></button>
      <br /><br />
      <button onClick={handleLogout}>Logout</button>
    </div>
</>
  )
}

