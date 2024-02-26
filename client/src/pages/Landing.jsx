import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", padding:"20px"}}>
        <h1 className='text-red-700 font-bold underline'>E-biz card</h1>
       <Link to='/signup'><button>Register</button> </Link> 
    </div>

  )
}
