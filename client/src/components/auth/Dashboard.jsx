import React, {useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(()=>{
      axios.get('http://localhost:3000/auth/verify', { withCredentials: true })
      .then(res=>{
        console.log('Verification response:', res.data);
          if(res.data.status){

          }else{
            console.log('User not verified. Redirecting to home.');
              navigate('/')
          }
      }) 
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>

      <Link to="/profileCreation"><button>Create card</button></Link>
      <br /> <br /> 
      <Link to="/allProfiles"><button>View all card</button></Link>
    </div>
  )
}